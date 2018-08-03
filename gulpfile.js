const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
var responsive = require('gulp-responsive');

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
          rename: { suffix: '_sm' },
        },
        {
          rename: { suffix: '_md' },
        }
      ]
    }))
    .pipe(gulp.dest('./dist/img'));
  done();
});

gulp.task('default',
  gulp.series('webpack', 'responsive')
)
