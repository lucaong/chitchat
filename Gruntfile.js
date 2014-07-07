module.exports = function(grunt) {

  grunt.initConfig({
    jison: {
      target : {
          options: {},
          files: {
            'lib/parser.js': 'lib/grammar.jison'
          }
       }
    },

    browserify: {
      dist: {
        files: {
          'web_repl/chitchat.js': ['lib/chitchat.js'],
        }
      },
      options: {
        bundleOptions: { standalone: 'chitchat' }
      }
    }
  })

  grunt.loadNpmTasks('grunt-jison')

  grunt.loadNpmTasks('grunt-browserify')

  grunt.registerTask('default', ['jison', 'browserify'])

};
