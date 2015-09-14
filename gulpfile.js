var gulp = require('gulp'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    templateCache = require('gulp-angular-templatecache'),
    runSequence = require('run-sequence'),
    series = require('stream-series'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify');

gulp.task('default', function(callback){
  runSequence(
    ['build-vendors-dev', 'build-scripts', 'move-folders', 'build-templates'],
    'inject',
    callback);
});

gulp.task('watch', function () {
    watch('./src/**', function () {
      runSequence([
        'build-vendors-dev',
        'build-scripts',
        'move-folders',
        'build-templates'
      ],'inject');
    });
});


gulp.task('build-vendors-dev', function(){
  return gulp.src([])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('dist/'));
});

// Move special folders to dist
gulp.task('move-folders', function(){
  return gulp.src([
    './src/vendor/src/skins/**/*.*'
  ],  { base: './src/vendor/src' })
  .pipe(gulp.dest('dist/'));
});


gulp.task('build-scripts', function(){
  return gulp.src('./src/app/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build-templates', function () {
  return gulp.src('./src/app/**/*.html')
   .pipe(templateCache({module:'vg', transformUrl: function(url){ return url } }))
   .pipe(concat('templates.js'))
   .pipe(gulp.dest('dist/'));
});

gulp.task('inject', function(){
  var target = gulp.src('./src/index.html');
  var vendor = gulp.src(['dist/vendors.js'], {read: false});
  var scripts = gulp.src(['dist/scripts.js'], {read: false});
  var templates = gulp.src(['dist/templates.js'], {read: false});

  return target.pipe(inject(series(vendor, scripts, templates), {relative: true, ignorePath: '../'}))
    .pipe(gulp.dest('.'));
})
