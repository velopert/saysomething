'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// LOAD ENV CONFIG
_dotenv2.default.config();

var app = (0, _express2.default)();
var port = process.env.port || 3000;

// SETUP MIDDLEWARE
app.use(_bodyParser2.default.json());

app.listen(port, function () {
    console.log('Express is running on port ' + port);
});