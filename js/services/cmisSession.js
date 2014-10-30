workbench.factory('cmisSession', ['$q',
  function($q) {

    var defer = $q.defer();

    var session = cmis.createSession(wbconfig.url);

    session.setGlobalHandlers(function(data) {
      $('#json').JSONView(data.text);
    }, function(data) {
      $('#json').JSONView(data);
    });

    session.loadRepositories().ok(function(data) {
      defer.resolve(session);
    });


    return defer.promise;
  }
]);
