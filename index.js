const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_Password}@cluster0.doolq.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors())
const port = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// console.log(process.env.DB_user + process.env.DB_Password+ process.env.DB_Name)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("Supetmarket");
        const allProduct = database.collection("allProduct");
        const topSave = database.collection("topSave");
        const trending = database.collection("trending");
        const orders = database.collection("order");
        console.log("Connected to database")
        // Code From Here CRUD
        /////////////// All Products ////
        app.post('/allProduct', async (req, res) => {
            const data = req.body
            const result = await allProduct.insertOne(data);
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)
        })

        app.get('/dataCollection', async (req, res) => {
            const data = allProduct.find({});
            const pd = await data.toArray();
            const pdrev = pd.reverse();
            res.send(pdrev)
        })

        app.get('/dataCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await allProduct.findOne(query);
            res.send(users)
        })
        app.delete('/dataCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await allProduct.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })
        /////// Top Save /////

        app.post('/topSaveInsert', async (req, res) => {
            const data = req.body
            const result = await topSave.insertOne(data)
            res.json(result)

        })

        app.get('/topSave', async (req, res) => {
            const data = topSave.find({});
            const result = await data.toArray();
            const pdrev = result.reverse();
            res.send(pdrev)
        })

        app.get('/topSave/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await topSave.findOne(query);
            res.send(users)
        })
        app.delete('/topSave/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await topSave.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })
        ///////////// Trending ///////////////
        app.post('/trendingInsert', async (req, res) => {
            const data = req.body
            const result = await trending.insertOne(data)
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)

        })

        app.get('/trending', async (req, res) => {
            const data = trending.find({});
            const result = await data.toArray();
            const pdrev = result.reverse();
            res.send(pdrev)
        })

        app.get('/trending/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            users = await trending.findOne(query);
            res.send(users)
        })

        app.delete('/trending/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await trending.deleteOne(query);
            console.log('delete user', result)
            res.json(result)
        })

        ////// Orders //////////////////////////////////////////////////////////////////

        app.post('/ordersInsert', async (req, res) => {
            const data = req.body
            const result = await orders.insertOne(data)
            console.log('New user found', req.body)
            console.log('New user added', result)
            res.json(result)

        })

        app.get('/order', async (req, res) => {
            const data = orders.find({});
            const result = await data.toArray();
            const pdrev = result.reverse();
            res.send(pdrev)
        })


        /////////////////


    } finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log("Local Host", port)
})
