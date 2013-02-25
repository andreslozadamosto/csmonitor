/****************************************************************
 * Load dependences                                             *
 ***************************************************************/
var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , stats = require('./routes/stats')
    , installer = require('./routes/installer')
    , io = require('socket.io');
mongodb = require('mongodb');


/****************************************************************
 * Bootstrap Express Server                                     *
 ***************************************************************/

var app = module.exports = express();

// Express Configuracion
app.configure(function(){
    app.set('port', 9000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

// Express Middlwares
app.configure(function(){ //all enviroments
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

// Express environments
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});

// Express Routes
app.get('/', routes.index);
app.get('/users', user.list);
app.post('/stats', stats.save);
app.get('/install', installer.run);

// Express start to listen
var s = app.listen(app.get('port'));
console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);



/****************************************************************
 * Bootstrap Socket.io Server                                   *
 ***************************************************************/

var socketio = io.listen(s);
// Socket.io handlers
socketio.sockets.on(
    'connection',
    function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    }
);

/****************************************************************
 * Bootstrap MongoDB                                            *
 *                                                              *
 * Queda corriendo el server de mongo                           *
 * el puerto 27017 es el default de MongoDB                     *
 ***************************************************************/

serverMongo = new mongodb.Server("127.0.0.1", 27017, {});
