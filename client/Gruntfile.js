module.exports = function(grunt) {

      require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

      grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
          babel: {
              options: {
                  sourceMap: true,
                  presets: ['es2015']
              },
              files: {
                    expand: true,
                    src: ['**/*.es6'],
                    ext: '-compiled.js'
              }
      }
      });

      grunt.registerTask('default', ['babel']);

}
