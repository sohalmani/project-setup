var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var imagemin = require("gulp-imagemin");
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var include = require('gulp-include');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

var srcPath = 'templates/src/';            // Path to the source files
var distPath = 'templates/dist/';            // Path to the distribution files

// Paths that gulp should watch
var watchPaths = {
    scripts: [
        srcPath + 'assets/js/*.js',
        srcPath + 'assets/js/**/*.js'
    ],
    images: [
        srcPath + 'assets/img/**'
    ],
    styles: [
        srcPath + 'assets/sass/*.scss',
        srcPath + 'assets/sass/**/*.scss'
    ],
    fonts: [
        srcPath + 'assets/fonts/**'
    ],
    html: [
        srcPath + '**/*.html',
        srcPath + '**/*.php'
    ]
};

// Css Task
gulp.task('styles', function () {
    gulp
        .src(srcPath + 'assets/sass/main.scss')
        .pipe(include())
        .pipe(sass())
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running sass task" }))
        .pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions'], cascade: false }))
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running sass task" }))
        .pipe(cssnano())
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running sass task" }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(distPath + 'assets/styles'));
});

// Javscript task
gulp.task('scripts', function () {
    gulp
        .src(srcPath + 'assets/js/*.js')
        .pipe(include())
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running scripts task" }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(distPath + 'assets/js'));
});

// Font task
gulp.task('fonts', function () {
    gulp
        .src([srcPath + 'assets/fonts/**'])
        .pipe(gulp.dest(distPath + 'assets/fonts'));
});

// HTML task
gulp.task('html', function () {
    gulp
        .src([srcPath + '*.html'])
        .pipe(include())
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running html task" }))
        .pipe(gulp.dest(distPath));
});

// Images task
gulp.task('images', function () {
    gulp
        .src(srcPath + 'assets/img/**')
        .pipe(imagemin())
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Error running image task" }))
        .pipe(gulp.dest(distPath + 'assets/img'));
});

// Watch task
gulp.task('watch', function () {
    gulp.watch(watchPaths.scripts, ['scripts']);
    gulp.watch(watchPaths.images, ['images']);
    gulp.watch(watchPaths.styles, ['styles']);
    gulp.watch(watchPaths.html, ['html']);
    gulp.watch(watchPaths.fonts, ['fonts']);

    livereload.listen();
    gulp.watch(distPath + '**').on('change', livereload.changed);
});

// Default task
gulp.task('default', ['html', 'styles', 'scripts', 'fonts', 'images', 'watch']);