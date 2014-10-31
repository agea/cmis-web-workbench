workbench.controller('InfoController', [
  '$scope', 'cmisSession',
  function($scope, cmisSession) {

    $scope.typeID = null;
    $scope.includePropertyDefinitions = false;
    $scope.options = {succinct:true,maxItems:100};

    $scope.getTypeChildren = function(){
      $('#json').html('');
      cmisSession.then(function(session){
          session.getTypeDescendants($scope.typeID,
            0,
            $scope.includePropertyDefinitions,
            $scope.options).ok(wbconfig.ok);
      });
    }
  }
]);
