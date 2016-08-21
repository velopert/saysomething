'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _message = require('../models/message');

var _message2 = _interopRequireDefault(_message);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    /*
        API: POST /api/write
        body: {message: 'message'}
        description: Write a new message
    */
    write: function write(req, res) {
        var session = req.session;

        // check color existancy
        if (!session.color) {
            return res.status(403).json({
                error: {
                    code: 1,
                    message: 'Invalid Request'
                }
            });
        }

        // check message validity
        if (typeof req.body.message !== 'string' || typeof req.body.uid !== 'string') {
            return res.status(400).json({
                error: {
                    code: 2,
                    message: 'Invalid Message'
                }
            });
        }

        if (req.body.message === '') {
            return res.status(400).json({
                error: {
                    code: 3,
                    message: 'Message is empty'
                }
            });
        }

        if (req.body.message.length > 50) {
            return res.status(400).json({
                error: {
                    code: 5,
                    message: 'Message is too long'
                }
            });
        }

        var msg = new _message2.default({
            message: req.body.message,
            uid: req.body.uid,
            color: session.color
        });

        msg.save().then(function () {
            var cache = res.app.get('cache');
            cache.notifyWorker();
            return res.json({
                success: true
            });
        }).catch(function (error) {
            throw error;
        });
    },
    list: {
        /*
            API: GET /api/message
            description: Loads initial message data
        */
        initial: function initial(req, res) {
            var cache = req.app.get('cache');
            return res.json(cache.messages);
        },

        /*
            API: GET /api/message/recent
            description: instantly loads initial data
        */

        initRecent: function initRecent(req, res) {
            var cache = req.app.get('cache');

            if (cache.messages.length > 0) {
                // this is an invalid request
                return res.status(400).json({
                    error: {
                        message: 'Invalid ID',
                        code: 1
                    }
                });
            }

            // it is empty, so wait for the new
            var waitForNewMemo = function waitForNewMemo() {
                return new Promise(function (resolve, reject) {
                    var timeoutId = void 0;
                    var check = function check() {
                        if (cache.messages.length > 0) {
                            // if the head is different
                            resolve(); // resolve the Promise
                            return;
                        }
                        timeoutId = setTimeout(check, 5); // or else, repeat this
                    };
                    check();
                    setTimeout(function () {
                        clearTimeout(timeoutId);
                        reject();
                    }, 1000 * 30); // timeout after 30 seconds
                });
            };

            waitForNewMemo().then(function () {
                var recentMsg = cache.messages;
                return res.json(recentMsg);
            }).catch(function () {
                return res.json([]); // timeout, return empty array.
            });
        },
        /*
            API: GET /api/list/old/:id
            params:
                id: message id
            description: Load messages older than given the given id
        */
        old: function old(req, res) {
            var id = req.params.id;

            // check id validity
            if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    error: {
                        message: 'Invalid ID',
                        code: 1
                    }
                });
            }

            _message2.default.find({ _id: { $lt: id } }).sort({ _id: -1 }).limit(25).exec().then(function (messages) {
                return res.json(messages.reverse());
            }).catch(function (error) {
                throw error;
            });
        },
        /*
            API: GET /api/list/recent/:id
            params:
                id: message id
            description: Load messages newer than given the given id
        */
        recent: function recent(req, res) {

            var id = req.params.id;
            var cache = req.app.get('cache');

            // check id validity
            if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    error: {
                        message: 'Invalid ID',
                        code: 1
                    }
                });
            }

            var recentMsg = cache.getRecentMsg(id);

            if (typeof recentMsg === 'undefined') {
                return res.status(400).json({
                    error: {
                        message: 'Invalid ID',
                        code: 1
                    }
                });
            }

            if (recentMsg.length > 0) {
                return res.json(recentMsg);
            }

            /* if recentMsg is undefined (which means given id does not exist in
            the cache), load directly from the mongod database.
             if(typeof recentMsg === 'undefined') {
                Message.find({_id: { $gt: id}})
                .sort({_id: -1})
                .limit(20)
                .exec()
                .then(
                    (messages) => {
                        return res.json(messages.reverse());
                    }
                ).catch(
                    (error) => {
                        throw error;
                    }
                );
            } else {
                // if there is more than one message, respond to the client
                if(recentMsg.length > 0) {
                    return res.json(recentMsg);
                }
            }*/

            /* if the tail matches id, it means there is no new memo. In this case,
            wait until there is a new memo. When 30 seconds pass, just return
            an empty array */

            if (cache.tail === id) {
                var waitForNewMemo = function waitForNewMemo() {
                    return new Promise(function (resolve, reject) {
                        var timeoutId = void 0;
                        var check = function check() {
                            if (id !== cache.tail) {
                                // if the head is different
                                resolve(); // resolve the Promise
                                return;
                            }
                            timeoutId = setTimeout(check, 5); // or else, repeat this
                        };
                        check();
                        setTimeout(function () {
                            clearTimeout(timeoutId);
                            reject();
                        }, 1000 * 30); // timeout after 30 seconds
                    });
                };

                waitForNewMemo().then(function () {
                    recentMsg = cache.getRecentMsg(id);
                    return res.json(recentMsg);
                }).catch(function () {
                    return res.json([]); // timeout, return empty array.
                });
            }
        }
    }
};