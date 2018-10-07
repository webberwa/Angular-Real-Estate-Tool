require('dotenv').config()
const gulp = require('gulp')
const run = require('gulp-run')
const gutil = require('gulp-util')

gulp.task('generate-graphql-schema', () => {
  run(
    `gql-gen --schema ${
      process.env.GRAPHQL_SCHEMA
    } --template graphql-codegen-apollo-angular-template --out ${
      process.env.GRAPHQL_SERVICES_OUTPUT
    } ./graphql/services/**/*.graphql`
  )
    .exec()
    .on('error', gutil.log)
})

gulp.task('watch-graphql-schema', () => {
  gulp.watch(
    [process.env.GRAPHQL_SCHEMA, './graphql/services/**/*.graphql'],
    ['generate-graphql-schema']
  )
})

gulp.task('watch-prisma-schema', function() {
  gulp.watch(process.env.PRISMA_SCHEMA, function() {
    // run('prisma generate').exec()
    run('prisma deploy')
      .exec()
      .on('error', gutil.log)
  })
})

gulp.task('default', ['watch-schema', 'generate-graphql-schema'])
gulp.task('watch-schema', ['watch-graphql-schema', 'watch-prisma-schema'])
