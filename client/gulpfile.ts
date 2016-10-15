var gulp = require("gulp");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');

gulp.task("fonts", function() {
	console.log('a');
    return gulp.src('./app/**/*.{eot,svg,ttf,woff,woff2,otf}')
    	.pipe(flatten())
		.pipe(gulp.dest('./fonts/'));
});
 
gulp.task("css", function() {
    return gulp.src('./app/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./css/'));
});

gulp.task("build", ['css', 'fonts']);
 