const { series, parallel, watch, src, dest } = require('gulp')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('gulp-cssnano')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')
const sitemap = require('gulp-sitemap')
const del = require('del')

// delete the all content in the dist folder
const clean = () => {
  del.sync(['dist/**/*'])
  return Promise.resolve()
}

// create sourcemap, minifiy and concat js
const js = () => {
  return src(['node_modules/axios/dist/axios.min.js', 'src/assets/js/*.js'])
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

// Watch
const watchFiles = () => {
  watch('src/**/*').on('change', browserSync.reload)
  watch('node_modules/**/*').on('change', browserSync.reload)
}

const startServer = () => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  })

  watchFiles()
}

// Default task
exports.default = series(clean, htmlMin, css, js, copy, siteMap)

// Start Dev Environment
exports.watch = series(exports.default, startServer)