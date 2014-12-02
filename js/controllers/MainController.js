workbench.controller('MainController', [
  '$scope', 'cmisSession', 'localStorageService',

  function ($scope, cmisSession, localStorageService) {

    localStorageService.bind($scope, 'username');
    localStorageService.bind($scope, 'password');
    localStorageService.bind($scope, 'url');

    if (!$scope.url) {
      $scope.url = "/alfresco/cmisbrowser";
    }

    $scope.options = {
      succinct: true,
      maxItems: 100,
      skipCount: 0
    };

    $('#loginModal').modal('show');

    $scope.prepare = function () {
      $('#json').html('');
    };

    $scope.login = function () {
      cmisSession.initCmis($scope.url, $scope.username, $scope.password);
    }


    cmisSession.then(function (session) {
      $('#json').JSONView(session.repositories);
    });

  }
]);