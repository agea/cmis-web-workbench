workbench.controller('MainController', [
  '$scope', 'cmisSession',
  
  function($scope, cmisSession) {
    cmisSession.then(function(session) {
      $('#json').JSONView(session.repositories);
    });

  }
]);
