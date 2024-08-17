const { MongoClient, Collection } = require('mongodb');

const userName = encodeURIComponent('satyamkarncs22');
const password = encodeURIComponent('s3ZZWypLJCkccFqV');

const dbName = 'my-data';
let db_1;

const connectDB = async () => {
    try {
        const client = new MongoClient(`mongodb+srv://${userName}:${password}@cluster0.hfsa6.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`, {
            tls: true,
            tlsAllowInvalidCertificates: false,
        });

        await client.connect();
        console.log('Connected !!!');
        db_1 = client.db(dbName);

    } catch (error) {
        console.log(error);
    }
};


const getDb = (collectionName) => {
    if (!db_1) {
        console.error("Database not connected !!! Call the connectDB first !!!");
        return;
    }
    console.log(db_1);
    return db_1.collection(collectionName);
};

module.exports = { connectDB, getDb };