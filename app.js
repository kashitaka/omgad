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
  http        = require( 'http' ),
  express     = require( 'express' ),
  bodyParser  = require( 'body-parser' ),
  morgan      = require( 'morgan' ),
  MongoClient = require( 'mongodb' ).MongoClient,
  asyncLoop   = require('node-async-loop'),
  async       = require('async'),
  app = express(),

  server,
  url = 'mongodb://localhost/omgad',
  db,
  config = {
    port : 8080
  };

// ----------- サーバー設定開始 -----------
server = http.createServer(app);
app.use( morgan({ format: 'dev' }) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
  extended: true
}));
app.use( express.static( __dirname + '/public' ) );

// ---------- 便利関数 ----------------
var hoge = function ( a ){
    console.log(a)
    return true;
};

function find( criteria, callback ) {
  db.collection( 'ad', function ( outer_error, collection ) {
    collection
      .find( criteria, {} )
      .toArray( function ( inner_error, list ) {
        callback( inner_error, list );
      });
  });
}
// ---------- 便利関数 ----------------


// ------------ ルーティング設定開始 ------------------
// ルートパス
app.get('/', function(req, res) {
  res.redirect( '/index.html' );
});

app.get('/api/', function ( req, res ) {
  var adData = null;
  if ( !req.query.words) {
    res.redirect( '/' );
    return;
  }
  var
    words = req.query.words.split(',');
    res;

  words = words.reverse();
  var first = words.shift();

  var len = words.length;

  console.log('入力:', first , words);

  asyncLoop(words, function (i, outer_next) {
    var second = words.shift();
    var criteria1 = { $and : [ { "k": first} , {"v.k" : second}]};
    console.log(criteria1);
    // ここで2ワードの検索
    find( criteria1, function (err, list) {
      if( words.length > 0 && list.length > 0) {
        // 検索結果があった場合はさらに掘ってく
        asyncLoop(words, function (word, inner_next) {
          var criteria2 = { $and : [ { "k": first} , {"v.k" : second}, {"v.v.k": word}]};
          console.log(criteria2);
          // ここで3ワードでの検索する
          find (criteria2, function ( err, list) {
            if (list.length > 0) {
              // 見つかった場合ここを通る
              res.send(list[0].v.v.v);
              return;
            }
          });
          // 見つからなかったので2ワードで検索
          var criteria1 = { $and : [ { "k": first} , {"v.k" : second}, {"v.isData" : true}]};
          find (criteria2, function ( err, list) {
            if(list.length > 0){
              res.send(list[0].v.v);
            }
          });
          inner_next();
          }, function (err) {
            console.log("内側終了");
          });
      }
      outer_next();
    });
  }, function (err){
    console.log("外側終了");
  });
});

// ------------ サーバー起動開始 ------------------
MongoClient.connect( url, function ( err, mongodb ) {
    console.log( '** Connected correctly to mongo **' );
    db = mongodb;
} );
server.listen( config.port );
console.log(
  'Express serveer listening on port %d in %s mode',
  server.address().port, app.settings.env
);
// ------------ サーバー起動終了 ------------------
