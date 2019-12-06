const { series, parallel, watch, src, dest } = require('gulp')
var uglify = require('gulp-uglify')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var cssnano = require('gulp-cssnano')
var concat = require('gulp-concat')
var htmlmin = require('gulp-htmlmin')
var sitemap = require('gulp-sitemap')
var del = require('del')

// delete the all content in the dist folder
const clean = () => {
  del.sync(['dist/**/*'])
  return Promise.resolve()
}

// create sourcemap, minifiy and concat js
const js = () => {
  return src('src/assets/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/assets/js'))
}

// create sourcemap, autoprefix, minify and concat css
const css = () => {
  src('src/assets/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(cssnano())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css'))
  return Promise.resolve()
}

//htmlmin
const htmlMin = () => {
  return src('./src/**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(dest('./dist'))
}

//copy
const copy = () => {
  src(
    './src/**/*.{jpg,png,gif,xml,json,txt,svg,eot,ttf,woff,woff2,otf,ttf,php,ico,htm}'
  ).pipe(dest('./dist'))
  return Promise.resolve()
}

//create sitemap.xml
const siteMap = () => {
  src('./src/**/*.html', {
    read: false
  })
    .pipe(
      sitemap({
        siteUrl: 'https://www.specttra.com.br'
      })
    )
    .pipe(dest('./dist'))
  return Promise.resolve()
}

// Default task
exports.default = series(clean, htmlMin, css, js, copy, siteMap)
