const gulp = require('gulp');
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin');

function minImg (){
    gulp.src('./images/*')
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.mozjpeg({quality: 75, progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			]
		})
	]))
        .pipe(gulp.dest('img/'))
};

 
function cssStyle(done) {
	gulp.src('./scss/style.scss')
	.pipe(sass({
		errorLogToConsole:true,
		outputStyle:'compressed'
	}))
	.on('error', console.error.bind(console))
		.pipe(rename({suffix:'.min'}))
		.pipe( gulp.dest('./css/'))
		.pipe(browserSync.stream())

	done()	

}
function reload(done) {
	browserSync.reload()
	done()
}

function watchFiles() {
	gulp.watch("./scss/**/*", cssStyle)
	gulp.watch("./**/*.html", reload)
	gulp.watch("./**/*.js", reload)
}

function sync(done){
	browserSync.init({
		server:{
			baseDir:"./"
		},
		port: 3000
	})
	done();
}

gulp.task('min', minImg)
 
gulp.task('default', gulp.parallel(watchFiles, sync));
