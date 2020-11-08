const gulp = require('gulp');
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer')

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
	.pipe(autoprefixer({
		browsers:['>0.1%']
	}))
	.on('error', console.error.bind(console))
		.pipe(rename({suffix:'.min'}))
		.pipe( gulp.dest('./css/'))
		.pipe(browserSync.stream())

	done()	

}

const  minJs = (done) => {
	gulp.src('scripts/index.js')
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('scripts/'))
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

gulp.task('uglify', minJs)
gulp.task('minImg', minImg)
 
gulp.task('default', gulp.parallel(watchFiles, sync));
