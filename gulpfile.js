/**
 * collect-appreciation gulpfile.js
 */

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('compress', () => {
  return gulp.src([
    './node_modules/chinese-name/index.js',
    './javascripts/*.js'
  ])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('index.js'))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist'))
});

gulp.task('default', ['compress'], function() {

  gulp.watch('./javascripts/*.js', ['compress']);
})
