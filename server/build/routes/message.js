'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _controllers.message.list.initial);
router.get('/old/:id', _controllers.message.list.old);
router.get('/recent', _controllers.message.list.initRecent);
router.get('/recent/:id', _controllers.message.list.recent);
router.post('/', _controllers.message.write);

exports.default = router;