var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var es = require('event-stream');
var browserSync = require('browser-sync').create();

gulp.task('default', ['serve'], function () {

});

gulp.task('serve', ['injection', 'sass:watch','injection:watch'], function () {
    browserSync.init({
        server: 'src'
    });

    gulp.watch('src/**/**').on('change',  browserSync.reload);

});


gulp.task('injection', ['sass'], function () {
    var cssFiles = gulp.src('src/css/**/*.css');

    var jsFiles = gulp.src('src/app/**/*.js', {
        read: false,
    });

    return gulp.src('src/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {
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
        .pipe(gulp.dest('src'));

});

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('injection:watch', function () {
    gulp.watch('src/**/**', ['injection']);
});