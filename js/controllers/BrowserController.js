workbench.controller('BrowserController', [
  '$scope', 'cmisSession',
  function ($scope, cmisSession) {

    $scope.children = {};
    $scope.returnVersion = '';

    cmisSession.then(function (session) {
      $scope.object = {
        succinctProperties: {
          'cmis:path': '/',
          'cmis:objectId': session.defaultRepository.rootFolderId
        }
      };
    });

    $scope.goToParent = function () {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getFolderParent($scope.prop($scope.object, 'cmis:objectId'), $scope.options)
          .$ok($scope, function (data) {
            $scope.object = data;
            $scope.getChildren();
          });
      });
    };

    $scope.goto = function (object) {
      $scope.object = object;
      $scope.getChildren();
    };

    $scope.prop = function (object, property) {
      if (!object) {
        return property;
      }
      if (object.properties) {
        return object.properties[property].value;
      }
      return object.succinctProperties[property];
    };

    $scope.getObject = function (object) {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getObject($scope.prop(object, 'cmis:objectId'), $scope.returnVersion, $scope.options)
          .ok(wbconfig.ok);
      });
    };

    $scope.getACL = function (object) {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getACL($scope.prop(object, 'cmis:objectId'), $scope.onlyBasicPermissions, $scope.options)
          .ok(wbconfig.ok);
      });
    };

    $scope.getAllVersions = function (object) {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getAllVersions($scope.prop(object, 'cmis:objectId'), $scope.options)
          .ok(wbconfig.ok);
      });
    };

    $scope.getChildren = function () {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getChildren($scope.prop($scope.object, 'cmis:objectId'), $scope.options)
          .$ok($scope, function (data) {
            $scope.children = data;
            wbconfig.ok(data);
          });
      });
    };

    $scope.getFolderTree = function () {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getFolderTree($scope.prop($scope.object, 'cmis:objectId'), $scope.options.depth, $scope.options)
          .$ok($scope, function (data) {
            $scope.children = data;
            wbconfig.ok(data);
          });
      });
    };

    $scope.checkOut = function (object) {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.checkOut($scope.prop(object, 'cmis:objectId'), $scope.options)
          .$ok($scope, function (data) {
            $scope.children = data;
            wbconfig.ok(data);
          });
      });
    };

    $scope.cancelCheckOut = function (object) {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.cancelCheckOut($scope.prop(object, 'cmis:objectId'), $scope.options)
          .$ok($scope, function (data) {
            $scope.children = data;
            wbconfig.ok(data);
          });
      });
    };

    $scope.getDescendants = function () {
      $scope.prepare();
      cmisSession.then(function (session) {
        session.getDescendants($scope.prop($scope.object, 'cmis:objectId'), $scope.options.depth, $scope.options)
          .$ok($scope, function (data) {
            $scope.children = data;
            wbconfig.ok(data);
          });
      });
    };

    cmisSession.then(function (session) {
      $scope.contentURL = function (object) {
        return session.getContentStreamURL($scope.prop(object, 'cmis:objectId'));
      };
    });

    }
  ]);