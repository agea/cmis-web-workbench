workbench.controller('MainController', [
  '$scope', 'cmisSession',

  function ($scope, cmisSession) {

    $scope.options = {
      succinct: true,
      maxItems: 100,
      skipCount: 0
    };

    $scope.prepare = function () {
      $('#json').html('');
    };

    cmisSession.then(function (session) {
      $('#json').JSONView(session.repositories);
    });

  }
]);