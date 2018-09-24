require('dotenv').config()
const gulp = require('gulp')
const watch = require('gulp-watch')
const run = require('gulp-run')
const exec = require('child_process').exec

gulp.task('prisma-update', function () {
  return watch(process.env.PRISMA_SCHEMA, function () {
    run('prisma generate').exec()
    run('prisma deploy').exec()
  })
})

gulp.task('default', ['prisma-update'])