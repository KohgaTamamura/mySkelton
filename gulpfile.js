var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
// var fs = require('fs');
// var ejs = require( 'gulp-ejs' );

var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var ejs = require( 'gulp-ejs' );


gulp.task('sass', function(){
  gulp.src('./material/scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(plumber())
  .pipe(gulp.dest('./app/css/'));
});


gulp.task('serverStart', function(){
  gulp.src('./app/')
  .pipe(webserver({
    livereload: true,
    direcotyListing: true,
    open: true,
    host: '0.0.0.0'
  }));
});


gulp.task('ejs', function(){
  gulp.src(['./material/ejs/*.ejs', '!' + './material/ejs/common/*.ejs'])
  .pipe(plumber())
  .pipe(ejs())
  .pipe(rename({extname: '.html'}))
  .pipe(gulp.dest('./app/'));
})


gulp.task('watchTask', function(){
  gulp.watch('./material/scss/*.scss', ['sass']);
  gulp.watch('./material/scss/**/*.scss', ['sass']);  
  gulp.watch(['*.ejs','./material/ejs/*.ejs','./material/ejs/common/*.ejs'], ['ejs']);
});


gulp.task('default',['sass','serverStart','watchTask']);



var fontName = 'icon';

gulp.task('iconfont', function(){
  return gulp.src(['./material/icon/*.svg'])
    .pipe(iconfont({
      fontName: fontName,
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff']
    }))
    .on('glyphs', function(glyphs) {

      var options = {
        glyphs: glyphs.map(function(glyph) {
          // this line is needed because gulp-iconfont has changed the api from 2.0
          return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
        }),
        fontName: fontName,
        fontPath: '/css/fonts/', // set path to font (from your CSS file if relative)
        className: 'icon' // set class name in your CSS
      };

      console.log(options);


      gulp.src('./material/icon/templates/fontawesome-style.scss')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:'_'+fontName }))
        .pipe(gulp.dest('./app/css/scss/components/')); // set path to export your CSS



      // if you don't need sample.html, remove next 4 lines
      gulp.src('./material/icon/templates/fontawesome-style.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:'icon' }))
        .pipe(gulp.dest('./app/')); // set path to export your sample HTML

    })
    .pipe(gulp.dest('app/css/fonts/'));
});