// server.js

// Import necessary modules
const express = require('express'); // Express is used for server creation
const { MongoClient } = require('mongodb'); // MongoClient is used to interact with MongoDB
require('dotenv').config(); // dotenv is used to load environment variables

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection string and client
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let collection;

// Connect to MongoDB and create the collection
async function connectToDB() {
    try {
        await client.connect();
        const database = client.db('testDB'); // Use or create the 'testDB' database
        collection = database.collection('testCollection'); // Use or create the 'testCollection' collection
        console.log('Connected to MongoDB and collection created.');
    } catch (error) {
        console.error('Failed to connect to the database.', error);
    }
}

// Route to insert multiple documents
app.post('/insert', async (req, res) => {
    try {
        const docs = req.body; // Get the documents from the request body
        const result = await collection.insertMany(docs);
        res.status(200).send(`${result.insertedCount} documents inserted.`);
    } catch (error) {
        res.status(500).send('Error inserting documents: ' + error);
    }
});

// Route to query documents
app.get('/find', async (req, res) => {
    try {
        const query = req.query; // Get query parameters from request
        const docs = await collection.find(query).toArray();
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).send('Error querying documents: ' + error);
    }
});

// Route to update a document
app.put('/update', async (req, res) => {
    try {
        const { filter, update } = req.body; // Get filter and update data from request
        const result = await collection.updateMany(filter, { $set: update });
        res.status(200).send(`${result.modifiedCount} documents updated.`);
    } catch (error) {
        res.status(500).send('Error updating documents: ' + error);
    }
});

// Route to delete a document
app.delete('/delete', async (req, res) => {
    try {
        const filter = req.body; // Get the filter to identify documents for deletion
        const result = await collection.deleteMany(filter);
        res.status(200).send(`${result.deletedCount} documents deleted.`);
    } catch (error) {
        res.status(500).send('Error deleting documents: ' + error);
    }
});

// Start the server after connecting to the database
app.listen(port, async () => {
    await connectToDB();
    console.log(`Server is running on http://localhost:${port}`);
});
