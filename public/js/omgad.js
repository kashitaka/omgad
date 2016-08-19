/*
 * omgad.js - omgad client.js
 * 2016/08/19 kashima Takao <kashima-t@asahi.com>
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

var omgad = ( function () {
  var initModule;

  initModule = function () {
    console.log('module initialized');
  };

  return {
    initModule : initModule
  };
}());
