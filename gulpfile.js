const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack-gulp.config.js');
const responsive = require('gulp-responsive');
const imagemin = require('gulp-imagemin');

gulp.task('webpack', (done) => {
  gulp.src('src/js/')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./dist'));
  done();
});

gulp.task('responsive', (done) => {
  gulp.src('./src/public/img/*.jpg')
    .pipe(responsive({
      '*.jpg': [
        {
          width: 400,
          rename: { suffix: '_400' },
        },
        {
          rename: { suffix: '_800' },
        }
      ]
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
  done();
});

gulp.task('default',
  gulp.series('webpack', 'responsive')
)
