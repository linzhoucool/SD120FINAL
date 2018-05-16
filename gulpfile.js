const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
var concat = require('gulp-concat');



gulp.task('CSS', () =>
    gulp.src('./src/css/*css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
);

gulp.task('IMAGES', () =>
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('JS', () =>
    gulp.src('./src/js/*js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist/js'))
);

gulp.task('scripts', function() {
    return gulp.src('./src/js/*js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'));
  });

  gulp.task('JSS', () =>
  gulp.src('./src/js/*js')
        .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
);