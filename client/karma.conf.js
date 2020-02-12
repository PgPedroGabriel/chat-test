// Karma configuration
// Generated on Sat Feb 04 2017 18:43:46 GMT+1100 (AEDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
          './node_modules/angular/angular.js',
          './src/client/lib/angular-route.js',
          './src/client/lib/ngGravatar.js',
          './src/client/lib/socket.io.js',
          './src/client/lib/angular-socket/socket.js',
          './node_modules/angular-ui-router/release/angular-ui-router.js', // ui-router
          './node_modules/angular-mocks/angular-mocks.js',                 // loads our modules for tests
          './src/client/app/app.js',
          './src/client/app/services/socket.js',
          // models
          './src/client/app/models/user-compiled.js',
          './src/client/app/models/message-compiled.js',
          './src/client/app/models/channel-compiled.js',
          './src/client/app/models/DMChannel-compiled.js',
          // services
          './src/client/app/services/socketEvents.js',
          './src/client/app/services/notifications-compiled.js',
          './src/client/app/services/events-compiled.js',
          './src/client/app/services/users-compiled.js',
          './src/client/app/login/loginController-compiled.js',
          './src/client/app/directives/messageForm/MessageFormController-compiled.js',

           './src/client/app/services/channels-compiled.js',
           './src/client/app/filters/*.js',

          // Unit tests
          './src/client/test/*.spec.js'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
