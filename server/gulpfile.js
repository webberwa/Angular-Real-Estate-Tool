require('dotenv').config()
const gulp = require('gulp')
const run = require('gulp-run')
const gutil = require('gulp-util')

gulp.task('generate-graphql-schema', () => {
  console.log(process.env.GRAPHQL_SCHEMA)
  console.log(process.env.GRAPHQL_SERVICES_OUTPUT)
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

gulp.task('prisma-deploy', () => {
  // run('prisma generate').exec()
  run('prisma deploy')
    .exec()
    .on('error', gutil.log)
})

gulp.task('watch-prisma-deploy', () => {
  gulp.watch(process.env.PRISMA_SCHEMA, ['prisma-deploy'])
})

gulp.task('default', [
  'watch-schema',
  'generate-graphql-schema',
  'prisma-deploy'
])
gulp.task('watch-schema', ['watch-graphql-schema', 'watch-prisma-deploy'])
