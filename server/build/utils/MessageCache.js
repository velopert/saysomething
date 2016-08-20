'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require('../models/message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageCache = function () {
    function MessageCache() {
        _classCallCheck(this, MessageCache);

        this.messages = [];
        this.idMap = [];
        this.tail = '';
        this.pending = true; // to do initial loading
        this.timeoutId = undefined;
    }

    _createClass(MessageCache, [{
        key: 'notifyWorker',
        value: function notifyWorker() {
            this.pending = true;
        }
    }, {
        key: 'startWorker',
        value: function startWorker() {
            var _this = this;

            var loadData = function loadData() {
                return _message2.default.find().sort({ _id: -1 }).limit(25).exec().then(function (messages) {
                    if (messages.length == 0) {
                        return false;
                    }

                    messages.reverse(); // reverse the array, since queried result is in reversed order
                    _this.messages = messages;
                    _this.idMap = messages.map(function (msg) {
                        return msg._id.toString();
                    });
                    _this.tail = _this.idMap[messages.length - 1];
                    return true;
                }).catch(function (error) {
                    console.error(error.stack);
                    return false;
                });
            };

            var work = function work() {
                if (_this.pending) {
                    console.log("Data Loading..");
                    _this.pending = false;
                    loadData().then(function (success) {
                        if (!success) {
                            console.error('Data loading has failed, retry in 3 seconds');
                            _this.pending = true;
                            _this.timeoutId = setTimeout(work, 3000);
                            return;
                        }
                        console.log('Cache is updated - ', _this.messages[0]._id);
                        _this.timeoutId = setTimeout(work, 5);
                    });

                    return;
                }

                _this.timeoutId = setTimeout(work, 5);
            };

            work();
        }
    }, {
        key: 'getRecentMsg',
        value: function getRecentMsg(id) {

            var index = this.idMap.indexOf(id);

            // do not use cache when id does not exist
            if (this.idMap.indexOf(id) == -1) return undefined;

            return this.messages.slice(index + 1, this.messages.length);
        }
    }]);

    return MessageCache;
}();

exports.default = MessageCache;