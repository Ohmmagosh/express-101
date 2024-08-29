import { MongoClient } from 'mongodb';

const express = require('express');
const body = require('body-parser');


async function start() {
    try {
        const  app = express();

        const mongo = new MongoClient('mongodb://localhost:27017');
        await mongo.connect();
        
        app.db = mongo.db();


        app.use(body.json());
        app.use(body.urlencoded({ extended: true }));


        app.use('/customers', require('./routes/customers').router);
        
        
        
        
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }
    catch (e) {
        console.log(e);
    }
}

start();