'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _MessageCache = require('./utils/MessageCache');

var _MessageCache2 = _interopRequireDefault(_MessageCache);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// LOAD ENV CONFIG
_dotenv2.default.config();

var app = (0, _express2.default)();
var port = process.env.port || 3000;

var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);

// SETUP MIDDLEWARE
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('tiny'));
app.use((0, _expressSession2.default)({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000 // 14 DAYS
    },
    store: new MongoStore({
        mongooseConnection: _mongoose2.default.connection,
        ttl: 14 * 24 * 60 * 60
    })
}));
app.use((0, _cors2.default)());
app.use((0, _compression2.default)());

// SERVE STATIC FILES
app.use('/', _express2.default.static(_path2.default.join(__dirname, './../../client/public')));

// SETUP ROUTER
app.use('/api', _routes2.default);

/* handle error */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        error: {
            message: 'Something Broke!',
            code: 0
        }
    });
    next();
});

var cache = new _MessageCache2.default();
app.set('cache', cache);

_mongoose2.default.Promise = global.Promise;
var db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('Connected to mongod server');
    cache.startWorker();
});

_mongoose2.default.connect(process.env.DB_URI);

app.listen(port, function () {
    console.log('Express is running on port ' + port);
});