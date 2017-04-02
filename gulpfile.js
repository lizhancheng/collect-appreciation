/**
 * collect-appreciation gulpfile.js
 */

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

gulp.task('compress', () => {
  return gulp.src([
    './resources/libs/urijs/URI.min.js',
    './resources/libs/require.js',
    './node_modules/chinese-name/index.js',
    './javascripts/*.js'
  ])
  .pipe(babel({
    // presets: [['es2015', { loose: true }]],
    // plugins to disable `use strict` mode because the `es2015` presets will enable strict mode
    plugins: [
      'check-es2015-constants',
      'transform-es2015-arrow-functions',
      'transform-es2015-block-scoped-functions',
      'transform-es2015-block-scoping',
      'transform-es2015-classes',
      'transform-es2015-computed-properties',
      'transform-es2015-destructuring',
      'transform-es2015-duplicate-keys',
      'transform-es2015-for-of',
      'transform-es2015-function-name',
      'transform-es2015-literals',
      'transform-es2015-object-super',
      'transform-es2015-parameters',
      'transform-es2015-shorthand-properties',
      'transform-es2015-spread',
      'transform-es2015-sticky-regex',
      'transform-es2015-template-literals',
      'transform-es2015-typeof-symbol',
      'transform-es2015-unicode-regex',
      'transform-regenerator',
    ]
  }))
  .pipe(concat('index.js'))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist'))
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
})

gulp.task('default', ['compress', 'serve'], function() {

  var watcher = gulp.watch('./javascripts/*.js', ['compress']);
  watcher.on('change', function() {
    browserSync.reload();
  });
})
