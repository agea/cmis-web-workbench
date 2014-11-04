workbench.controller('QueryController', [
  '$scope', 'cmisSession',
  function($scope, cmisSession) {

    $scope.query = "";
    $scope.searchAllVersions = false;

    $scope.canSearchAllVersions = false;

    cmisSession.then(function(session) {
      $scope.canSearchAllVersions = session.defaultRepository.capabilities.capabilityAllVersionsSearchable;
    });

    $scope.runQuery = function() {
      $scope.prepare();
      cmisSession.then(function(session) {
        session.query($scope.query, $scope.searchAllVersions, $scope.options).ok(wbconfig.ok);
      });
    }
  }
]);
