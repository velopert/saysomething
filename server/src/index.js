import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';

import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

import api from './routes';
import MessageCache from './utils/MessageCache';

import dotenv from 'dotenv';

// LOAD ENV CONFIG
dotenv.config();

const app = express();
const port = process.env.port || 3000;


const MongoStore = connectMongo(session);

// SETUP MIDDLEWARE
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000  // 14 DAYS
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl:14 * 24 * 60 * 60
    })
}));

// SETUP ROUTER
app.use('/api', api);

/* handle error */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: {
            message: 'Something Broke!',
            code: 0
        }
    });
});

const cache = new MessageCache();
app.set('cache', cache);

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Connected to mongod server');
    cache.startWorker();
});

mongoose.connect(process.env.DB_URI);

app.listen(port, () => {
    console.log(`Express is running on port ${port}`);
});