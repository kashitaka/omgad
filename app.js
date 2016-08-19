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

// ----------- ���W���[���X�R�[�v�ϐ��J�n -----------
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

// ----------- �T�[�o�[�ݒ�J�n -----------
server = http.createServer(app);
app.use( morgan({ format: 'dev' }) );


 // ------------ �T�[�o�[�N���J�n ------------------
server.listen( config.port );
console.log(
  'Express serveer listening on port %d in %s mode',
  server.address().port, app.settings.env
);
// ------------ �T�[�o�[�N���I�� ------------------
