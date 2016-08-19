/*
 * app.js - omgad web application
 * 2016/08/19 kashima Takao <kashima-t@asahi.com>
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ----------- モジュールスコープ変数開始 -----------
'use strict';

var
  http             = require( 'http' )
, express          = require( 'express' )
, bodyParser       = require( 'body-parser' )
, morgan           = require( 'morgan' )
, app = express()
, server
, config = {
    port : 8080
  }
;

// ----------- サーバー設定開始 -----------
server = http.createServer(app);
app.use( morgan({ format: 'dev' }) );


 // ------------ サーバー起動開始 ------------------
server.listen( config.port );
console.log(
  'Express serveer listening on port %d in %s mode',
  server.address().port, app.settings.env
);
// ------------ サーバー起動終了 ------------------
