workbench.controller('QueryController', [
  '$scope', 'cmisSession',
  function($scope, cmisSession) {

    $scope.query="";
    $scope.searchAllVersions = false;
    $scope.options = {succinct:true,maxItems:100};

    $scope.runQuery = function(){
      $('#json').html('');
      cmisSession.then(function(session){
          session.query($scope.query, $scope.searchAllVersions, $scope.options).ok(wbconfig.ok);
      });
    }
  }
]);
