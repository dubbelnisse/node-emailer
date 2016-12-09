const gulp = require('gulp')
const eslint = require('gulp-eslint')
const mocha = require('gulp-mocha')

const running = {}
const watching = {}

const files = {
  gulp: 'gulpfile.js',
  src: 'lib/**/*.js',
  unit: 'test/unit/**/*.spec.js',
  integration: 'test/integration/**/*.spec.js',
  migrations: 'migrations/*.js'
}
files.all = Object.keys(files).map(k => files[k])

gulp.task('lint', () => {
  running.lint = files.all
  return gulp.src(running.lint)
    .pipe(eslint())
    .pipe(eslint.format())
})

gulp.task('test:unit', () => {
  process.env.LOG_LEVEL = 'none'
  running['test:unit'] = [files.src, files.unit]
  return gulp.src(files.unit)
    .pipe(mocha({reporter: 'spec'}))
})

gulp.task('test:integration', () => {
  process.env.LOG_LEVEL = 'none'
  running['test:unit'] = [files.src, files.integration]
  return gulp.src(files.integration)
    .pipe(mocha({reporter: 'spec'}))
})

gulp.task('test', () => {
  process.env.LOG_LEVEL = 'none'
  running['test'] = [files.src, files.unit, files.integration]
  return gulp.src([files.unit, files.integration])
    .pipe(mocha({reporter: 'spec'}))
})

gulp.task('watch', () => {
  Object.keys(running).forEach(key => {
    if (!watching[key]) {
      watching[key] = true
      gulp.watch(running[key], [key])
    }
  })
})
