/*global module:false*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({
    bower_concat: {
      all: {
        dest: 'build/bower.js',
        cssDest: 'build/bower.css',
        mainFiles: {
          'cmis': 'lib/cmis.js',
        },
        bowerOptions: {
          relative: false
        }
      }
    },
    concat:{
      dist:{
        src:['js/*'],
        dest:'build/workbench.js'
      }
    },
    cssmin: {
      combine: {
        files: {
          'bower.min.css': 'build/bower.css'
        }
      }
    },
    uglify: {
      bower: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'bower.min.js': 'build/bower.js',
        }
      }
    }
  });

grunt.registerTask('buildbower', [
  'bower_concat',
  'uglify:bower',
  'cssmin'
]);

grunt.registerTask('buildwb', [
  'concat:dist'
]);

};
