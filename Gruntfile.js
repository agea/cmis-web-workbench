/*global module:false*/
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var host = "cmis.alfresco.com";
  var port = 80;
  var path = "/cmisbrowser";

  if (process.argv.indexOf('--host') != -1) {
    host = process.argv[process.argv.indexOf('--host') + 1];
  }

  if (process.argv.indexOf('--port') != -1) {
    port = process.argv[process.argv.indexOf('--port') + 1];
  }

  if (process.argv.indexOf('--path') != -1) {
    path = process.argv[process.argv.indexOf('--path') + 1];
  }

  grunt.initConfig({
    bower_concat: {
      all: {
        dest: 'build/bower.js',
        cssDest: 'build/bower.css',
        mainFiles: {
          'cmis': 'lib/cmis.js',
          'jsonview': ['dist/jquery.jsonview.js', 'jquery.jsonview.css']
        },
        bowerOptions: {
          relative: false
        }
      }
    },
    concat: {
      dist: {
        src: ['js/*', 'js/services/*', 'js/controllers/*'],
        dest: 'build/workbench.js'
      }
    },

    connect: {
      server: {
        proxies: [
          {
            context: '/alfresco/cmisbrowser',
            host: host,
            port: port,
            rewrite: {
              '^/alfresco/cmisbrowser': path
            },
            changeOrigin: true
          }
        ],
        options: {
          port: 9000,
          keepalive: true,
          middleware: function (connect, options) {
            var config = [
                connect.static(options.base),
                connect.directory(options.base)
                ];
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            config.unshift(proxy);
            return config;
          }
        },

      }
    },

    cssmin: {
      combine: {
        files: {
          'bower.min.css': ['build/bower.css', 'app/bower_components/jquery-jsonview/dist/jquery.jsonview.css']
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
          'bower.min.js': 'build/bower.js'
        }
      }
    },
    inline: {
      dist: {
        options: {
          tag: '',
          cssmin: true,
          uglify: false
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

  grunt.registerTask('server', [
    'configureProxies:server',
    'connect'
  ]);

  grunt.registerTask('buildwb', [
    'concat:dist'
  ]);

  grunt.registerTask('buildinline', [
    'inline:dist'
  ]);

};