const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');


const browserSync = require('browser-sync').create();

//compile sass into css, optimize it
function style() {
    return gulp.src('src/sass/*.sass') // берем все файлы с расширением
        //2. pass that file through sass compiler
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('src/css'))
        //4. stream change to all browsers
        .pipe(browserSync.stream());
}
function changeStyle(){
    return gulp.src('src/css/*.css') // берем все файлы с расширением
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(cssnano())
        .pipe(gulp.dest('src/css/min'))
    //4. stream change to all browsers
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./src",
            index: "/index.html"
        }
    });
    gulp.watch('src/sass/*.sass', gulp.series(style, changeStyle));
    // gulp.watch('src/css/*.*', changeStyle());
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
