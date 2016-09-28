var gulp = require("gulp");
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task("default", function () {
    gulp.watch('./styles/**/*.less', ['less']);
});

gulp.task("less", function() {
    return gulp.src('./styles/less/design.less')
        .pipe(less())
        .pipe(gulp.dest('./styles/css/'))

    &&

    gulp.src('./styles/css/design.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./styles/css/'));
});
