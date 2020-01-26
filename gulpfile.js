var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
// var watch = require ('gulp-watch');
var browserSync = require('browser-sync');

function sassCompile(done) {
  (gulp.src("./scss/**/*.scss"))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
  done();
}

gulp.task('sass-compile', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write()).pipe(gulp.dest('./css/'))
});

function watchSass() {
  gulp.watch("./scss/**/*", sassCompile);
}

function sync(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

gulp.task('default', gulp.parallel(sync, watchSass));