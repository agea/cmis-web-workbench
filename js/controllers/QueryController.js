workbench.controller('QueryController', [
  '$scope', 'cmisSession', 'localStorageService',
  function ($scope, cmisSession, localStorageService) {

    $scope.query = "";

    $scope.cmOptions = {
      mode: 'text/x-mysql',
      lineWrapping: true,
      indentWithTabs: true,
      lineNumbers: true,
      autofocus: true
    };

    localStorageService.bind($scope, 'history');

    if (!$scope.history) {
      $scope.history = [];
    }

    $scope.hi = 1;

    $scope.searchAllVersions = false;

    $scope.canSearchAllVersions = false;

    cmisSession.then(function (session) {
      $scope.canSearchAllVersions = session.defaultRepository.capabilities.capabilityAllVersionsSearchable;
    });

    $scope.runQuery = function () {
      $scope.prepare();

      var h = [];
      for (var i = 0; i < $scope.history.length; i++) {
        var q = $scope.history[i];
        if (q != $scope.query) {
          h.push(q);
          console.log(q);
        }
      }
      h.push($scope.query);
      $scope.history = h;

      cmisSession.then(function (session) {
        session.query($scope.query, $scope.searchAllVersions, $scope.options).ok(wbconfig.ok);
      });
    }
}]);