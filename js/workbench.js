var wbconfig = wbconfig || {
  url:'/alfresco/api/-default-/public/cmis/versions/1.1/browser',
  ok:function(data){$('#json').JSONView(data);}
  };

var workbench = angular.module('workbench',[]);
