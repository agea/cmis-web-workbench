var wbconfig = wbconfig || {
  url:'http://localhost:28080/alfresco/api/-default-/public/cmis/versions/1.1/browser',
  ok:function(data){$('#json').JSONView(data);}
  };

var workbench = angular.module('workbench',[]);
