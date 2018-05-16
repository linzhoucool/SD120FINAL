const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');



gulp.task('CSS', () =>
    gulp.src('./src/css/*css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
);