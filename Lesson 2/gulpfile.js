/*eslint-env node */
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');

gulp.task('default', function() {
	gulp.watch('sass/**/*.scss',['styles','lint']);
  gulp.watch('js/**/*.js',['lint']);

  browserSync.init({
    server: './'
  });
});

gulp.task('lint', function() {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
      });

gulp.task('tests', function(){
  gulp.src('tests/spec/extraSpec.js')
  .pipe(jasmine({
    integration: true,
    vendor: 'js/**/*.js'
  }));
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
   browsers: ['last 2 versions']
 }))
  .pipe(gulp.dest('./css'));
});
