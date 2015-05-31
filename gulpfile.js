"use strict";

var gulp = require("gulp");
var swig = require("gulp-swig");
var sass = require("gulp-sass");
var serve = require("gulp-serve");
var watch = require("gulp-watch");
var plumber = require("gulp-plumber");

var FILE_SWIG = "./src/**/*.html";
var FILE_SCSS = "./src/scss/*.scss";
var FILE_IMG = "./src/img/**/*";
var FILE_JS = "./src/js/**/*";
var FILE_CONFIG = "./config/*";

gulp.task("swig", function () {
    gulp.src(FILE_SWIG)
        .pipe(plumber())
        .pipe(swig({
            defaults: {
                cache: false
            }
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task("sass", function () {
    gulp.src(FILE_SCSS)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("img", function () {
    gulp.src(FILE_IMG)
        .pipe(gulp.dest("./dist/img"));
});

gulp.task("js", function () {
    gulp.src(FILE_JS)
        .pipe(gulp.dest("./dist/js"));
});

gulp.task("serve", serve(["dist"]));

gulp.task("watch", function () {
    gulp.start("default");
    gulp.start("serve");

    watch(FILE_SWIG, function () {
        gulp.start("swig");
    });

    watch(FILE_CONFIG, function () {
        gulp.start("swig");
    });

    watch(FILE_SCSS, function () {
        gulp.start("sass");
    });

    watch(FILE_IMG, function () {
        gulp.start("img");
    });

    watch(FILE_JS, function () {
        gulp.start("js");
    });
});

gulp.task("default", [
    "swig",
    "sass",
    "img",
    "js"
]);
