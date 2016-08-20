import Message from '../models/message';

class MessageCache {

    constructor() {
        this.messages = [];
        this.idMap = [];
        this.tail = '';
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
                    messages.reverse(); // reverse the array, since queried result is in reversed order
                    this.messages = messages;
                    this.idMap = messages.map(
                        (msg) => {
                            return msg._id.toString();
                        }
                    );
                    this.tail = this.idMap[messages.length-1];
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
                        this.timeoutId = setTimeout(work, 5);
                    }
                );

                return;
            }

            this.timeoutId = setTimeout(work, 5);
        };

        work();
    }

    getRecentMsg(id) {

        const index = this.idMap.indexOf(id);

        // do not use cache when id does not exist
        if(this.idMap.indexOf(id) == -1)
            return undefined;

        return this.messages.slice(index+1, this.messages.length);
    }
}

export default MessageCache;
