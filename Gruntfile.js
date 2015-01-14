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

  grunt.registerTask('server', [
    'configureProxies:server',
    'connect'
  ]);

  grunt.registerTask('dist', [
    'inline:dist'
  ]);

};