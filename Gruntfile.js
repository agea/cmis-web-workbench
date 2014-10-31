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
          'jsonview': ['dist/jquery.jsonview.js', 'jquery.jsonview.css'],
        },
        bowerOptions: {
          relative: false
        }
      }
    },
    concat:{
      dist:{
        src:['js/*','js/services/*', 'js/controllers/*'],
        dest:'build/workbench.js'
      }
    },
    cssmin: {
      combine: {
        files: {
          'bower.min.css': ['build/bower.css','app/bower_components/jquery-jsonview/dist/jquery.jsonview.css']
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
    },
    inline: {
        dist: {
            options:{
                tag: '',
                cssmin:true,
                uglify:true
            },
            src: ['index.html'],
            dest: ['dist/workbench.html']
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

grunt.registerTask('buildinline', [
  'inline:dist'
]);

};
