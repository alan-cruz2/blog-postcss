var gulp = require('gulp');
var postCss = require('gulp-postcss');

// feature plugins
var cssNext = require('postcss-cssnext');
var preCss = require('precss');
var rgbaFallback = require('postcss-color-rgba-fallback');
var opacity = require('postcss-opacity');
var pseudoElements = require('postcss-pseudoelements');
var willChange = require ('postcss-will-change');

// custom plugins
var myPlugin = require('./customPlugin/myPlugin');

// build process/packing plugins
var postImport = require('postcss-import');
var mqPacker = require('css-mqpacker');
var cssNano = require('cssnano');

gulp.task('css', function(){
  // postcss plugins
  // Note: depending on the plugin order does matter
  // autoprefixer (included in cssNext) should come last
  // since it adds the vendor prefixes the other plugins may require
  
  var plugins = [
    // build plugins
    postImport,
    mqPacker,
    // cssNano,
    // feature plugins
    willChange,
    preCss,
    rgbaFallback,
    opacity,
    pseudoElements,
    myPlugin,
    cssNext({
      browsers: 'last 5 versions'
    }),
  ];
  
  return gulp.src(['./src/*.css', './node_modules/normalize.css/*.css'])
    .pipe(postCss(plugins))
    .pipe(gulp.dest('./dest'));
});
