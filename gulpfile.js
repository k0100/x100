var gulp = require("gulp");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var filenames = require("gulp-filenames");
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');

var config = {
    bootstrapDir: './node_modules/bootstrap/scss',
    bootstrapCustom: './client/scss',
    publicDir: './client',
};

gulp.task('css', function () {
    const customBootstrapFile = config.bootstrapDir + '/_custom.scss';

    if (fs.existsSync(customBootstrapFile))
        fs.unlinkSync(customBootstrapFile);

    return gulp.src('./client/scss/app.scss')
        .pipe(sass({
            includePaths: [config.bootstrapCustom, config.bootstrapDir],
        }))
        .pipe(gulp.dest(config.publicDir + '/css'));
});
// gulp.task("fonts", function() {
// 	console.log('a');
//     return gulp.src('./client/app/**/*.{eot,svg,ttf,woff,woff2,otf}')
//     	.pipe(flatten())
// 		.pipe(gulp.dest('./fonts/'));
// });
// gulp.task("css", function() {
//     return gulp.src('./client/css/**/*.scss')
// 	// return gulp.src(['./app/assets/vendor/toasty.css'])
// 		.pipe(sass().on('error', sass.logError))
// 		.pipe(concat('all.css'))
// 		.pipe(gulp.dest('./css/'));
// });
gulp.task("build", ["css"]);
//# sourceMappingURL=gulpfile.js.map