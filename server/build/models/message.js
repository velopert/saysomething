'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = new _mongoose.Schema({
    message: String,
    date: { type: Date, default: Date.now },
    uid: String,
    color: [] // stores color in r, g, b array
});

exports.default = _mongoose2.default.model('message', Message);