var gulp = require('gulp');
var traceur = require('gulp-traceur');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');



gulp.task('localscript', [], function (done) {
    return gulp.src([
        'app/*.js'        
    ])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(plumber())
    .pipe(gulp.dest('dist'));

    
});


gulp.task('traceur:runtime', ['localscript'], function(done) {
  return gulp.src(traceur.RUNTIME_PATH)
    .pipe(gulp.dest('app/dist'));
	done('ok');
});


gulp.task('traceur:transpile', ['traceur:runtime'], function (callback) {
    
    
    return gulp.src([
          
          'app/*.js'
          
        ])
		.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(plumber())
        .pipe(traceur({ blockBinding: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist'));
	callback('ok');
});



gulp.task('default', ['traceur:transpile'], function(){
	
});





