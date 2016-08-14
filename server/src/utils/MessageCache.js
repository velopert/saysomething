import mongoose from 'mongoose';
import Message from '../models/message';

class MessageCache {

    constructor() {
        this.messages = [];
        this.idMap = [];
        this.head ='';
        this.pending = true; // to do initial loading
        this.timeoutId = undefined;
    }

    notifyWorker() {
        this.pending = true;
    }

    startWorker() {
        const loadData = () => {
            return Message.find()
            .sort({_id: -1})
            .limit(20)
            .exec()
            .then(
                (messages) => {
                    this.messages = messages;
                    this.idMap = messages.map(
                        (msg) => {
                            return msg._id.toString();
                        }
                    );
                    this.head = this.idMap[0];
                }
            ).catch(
                (error) => {
                    console.error(error.stack);
                }
            );
        };

        const work = () => {
            if(this.pending) {
                console.log("Data Loading..");
                this.pending = false;
                loadData().then(
                    () => {
                        console.log('Cache is updated - ', this.messages[0]._id);
                        this.timeoutId = setTimeout(work, 100);
                    }
                );

                return;
            }

            this.timeoutId = setTimeout(work, 1000);
        };

        work();
    }

    getRecentMsg(id) {

        const index = this.idMap.indexOf(id);

        // do not use cache when id does not exist
        if(this.idMap.indexOf(id) == -1)
            return undefined;

        return this.messages.slice(0,index);
    }
}

export default MessageCache;