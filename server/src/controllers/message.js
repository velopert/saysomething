import Message from '../models/message';
import mongoose from 'mongoose';

export default {
    /*
        API: POST /api/write
        body: {message: 'message'}
        description: Write a new message
    */
    write: (req, res) => {
        const session = req.session;

        // check color existancy
        if(!session.color) {
            return req.status(403).json({
                error: {
                    code: 1,
                    message: 'Invalid Request'
                }
            });
        }

        // check message validity
        if(typeof req.body.message !== 'string') {
            return req.status(400).json({
                error: {
                    code: 2,
                    message: 'Invalid Message'
                }
            });
        }

        if(typeof req.body.message !== 'string') {
            return req.status(400).json({
                error: {
                    code: 3,
                    message: 'Message is empty'
                }
            });
        }

        const msg = new Message({
            message: req.body.message,
            color: session.color
        });

        msg.save().then(
            (message) => {
                const cache = res.app.get('cache');
                cache.notifyWorker();
                return res.json({
                    success: true
                });
            }
        ).catch(
            (error) => {
                throw error;
            }
        );
    },
    list: {
        /*
            API: GET /api/list
            description: Loads initial message data
        */
        initial: (req, res) => {
            const cache = req.app.get('cache');
            return res.json(
                cache.messages
            );

        },
        /*
            API: GET /api/list/recent/:id
            params:
                id: message id
            description: Load messages newer than given the given id
        */
        recent: (req, res) => {

            const id = req.params.id;

            // check id validity
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    error: {
                        message: 'Invalid ID',
                        code: 1
                    }
                });
            }

            const cache = req.app.get('cache');

            let recentMsg = cache.getRecentMsg(id);

            // if there is more than one message, respond to the client
            if(recentMsg.length > 0) {
                return res.json(recentMsg);
            }

            /* if recentMsg is undefined (which means given id does not exist in
            the cache), load directly from the mongod database.
            */
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
            }

            /* if the tail matches id, it means there is no new memo. In this case,
            wait until there is a new memo. When 30 seconds pass, just return
            an empty array */

            if(cache.tail === id) {
                const waitForNewMemo = new Promise(
                    (resolve, reject) => {
                        let timeoutId;
                        const check = () => {
                            if(id !== cache.tail) {
                                // if the head is different
                                resolve(); // resolve the Promise
                                return;
                            }
                            timeoutId = setTimeout(check, 100); // or else, repeat this
                        };
                        check();
                        setTimeout(
                            () => {
                                clearTimeout(timeoutId);
                                reject();
                            }, 1000 * 30); // timeout after 30 seconds
                    }
                );

                waitForNewMemo.then(
                    () => {
                        recentMsg = cache.getRecentMsg(id);
                        return res.json(recentMsg);
                    }
                ).catch(
                    () => {
                        return res.json([]); // timeout, return empty array.
                    }
                );


            }

        }
    }
};
