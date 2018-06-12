const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer');	

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('sass', function (){
	gulp.src('./scss/*.scss')
		.pipe(sass({
			outputStyle: 'compact'
		})) 
		.pipe(autoprefixer({
			versions: ['last 2 browsers']
		}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
})

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", reload);
    gulp.watch("./css/*.css").on("change", reload);
    gulp.watch("./scss/*.scss", ['sass']);
});

gulp.task('default', ['sass', 'serve'] );