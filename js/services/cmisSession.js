workbench.factory('cmisSession', ['$q',
  function ($q) {

    var defer = $q.defer();

    defer.promise.initCmis = function (url, username, password) {

      var session = cmis.createSession(url);
      session.setGlobalHandlers(function (data) {
        $('#json').JSONView(data.text);
      }, function (data) {
        $('#json').JSONView(data);
      });

      session
        .setCredentials(username, password)
        .loadRepositories()
        .ok(function (data) {
          defer.resolve(session);
        });

    };


    return defer.promise;
  }

]);