workbench.controller('InfoController', [
  '$scope', 'cmisSession',
  function ($scope, cmisSession) {


    $scope.getRepositoryInfo = function () {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getRepositoryInfo($scope.options).ok(wbconfig.ok);
      });
    };
    
    $scope.getContentChanges = function () {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getContentChanges($scope.changeLogToken,
          $scope.includeProperties,
          $scope.includePolicyIds,
          $scope.includeACL,
          $scope.options).ok(wbconfig.ok);
      });
    };
    
    $scope.getCheckedOutDocs = function () {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getCheckedOutDocs($scope.objectID,
          $scope.options).ok(wbconfig.ok);
      });
    };
    
    $scope.getTypeChildren = function () {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getTypeChildren($scope.typeID,
          $scope.includePropertyDefinitions,
          $scope.options).ok(wbconfig.ok);
      });
    };
    
    $scope.getTypeDefinition = function () {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getTypeDefinition($scope.typeID,
          $scope.options).ok(wbconfig.ok);
      });
    };
    
    $scope.getTypeDescendants = function () {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getTypeDescendants($scope.typeID,
          $scope.depth || 0,
          $scope.includePropertyDefinitions,
          $scope.options).ok(wbconfig.ok);
      });
    };
    
  }
]);