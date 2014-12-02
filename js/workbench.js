var wbconfig = wbconfig || {
  url: '/cmisbrowser',
  ok: function (data) {
    $('#json').JSONView(data);
  }
};

var workbench = angular.module('workbench', ['LocalStorageModule', 'ui.codemirror']);