var gulp = require("gulp");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var config = {
    bootstrapDir: './node_modules/bootstrap/scss',
    publicDir: './client',
};
gulp.task('css', function () {
    return gulp.src('./client/scss/app.scss')
        .pipe(sass({
        includePaths: [config.bootstrapDir + ''],
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