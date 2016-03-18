const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    esLint = require('gulp-eslint'),
    babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
	bulkSass = require('gulp-sass-bulk-import'),
	cssnano = require('gulp-cssnano'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    browserSync = require('browser-sync').create(),
    stylesDir = 'source/scss/',
    scriptsDir = 'source/js/',
	localDir = 'localhost/site';
	
    
gulp.task('styles', () =>
    gulp.src(stylesDir+'styles.scss')
    .pipe(sourcemaps.init())
    .pipe(bulkSass())
    .pipe(sass({
        includePaths: [stylesDir]
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 4 versions'],
            cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
);

gulp.task('scripts', () =>
    gulp.src(scriptsDir+'*.js')
    .pipe(sourcemaps.init())
	.pipe(esLint())
    .pipe(esLint.format())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('scripts.js'))
	.pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'))
);

gulp.task('browser-sync', () =>
    browserSync.init({
        proxy: localDir,
		files: [stylesDir+'**/**/*.scss', scriptsDir+'**/**/*.js', './**/**/**/**/*.php']
    })
);

gulp.task('watch', function(){
    gulp.watch(stylesDir+'**/*.scss', ['styles']);
	gulp.watch(scriptsDir+'**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'styles', 'browser-sync','watch']);