var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var es = require('event-stream');
var minifyCSS = require('gulp-minify-css');

gulp.task('default', ['serve'], function () {

});

gulp.task('serve', ['injection', 'sass:watch', 'injection:watch'], function () {

});


gulp.task('injection', ['sass'], function () {
    var cssFiles = gulp.src('www/css/**/*.css');

    var jsFiles = gulp.src('www/app/**/*.js', {
        read: false,
    });

    return gulp.src('www/index.html')
        .pipe(inject(gulp.src(mainBowerFiles(), {
            read: false
        }), {
            relative: true,
            name: 'bower'
        }))
        .pipe(inject(es.merge(
            cssFiles,
            jsFiles
        ), {
            relative: true
        }))
        .pipe(gulp.dest('www'));

});

gulp.task('sass', function () {
    return gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest('www/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('injection:watch', function () {
    gulp.watch('www/**/**', ['injection']);
});