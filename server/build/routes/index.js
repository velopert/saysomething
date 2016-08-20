'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/*', function (req, res, next) {
    res.set("Connection", "keep-alive");
    next();
});
router.use('/message', _message2.default);
router.use('/session', _session2.default);

exports.default = router;