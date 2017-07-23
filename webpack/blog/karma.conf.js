module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'src/scripts/**/*.test.js',
    ],
    exclude: [
    ],
    preprocessors: {
      ['src/scripts/**/*.test.js']: ['webpack']
    },
    webpack: require('./webpack.config.js')(),
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity
  })
}
