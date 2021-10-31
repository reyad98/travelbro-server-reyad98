const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require ('dotenv').config();

const app = express();
const port = process.env.PORT|| 8000;

// id: travel98
// pass: mXg4NKFC5piV2i43

app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://travel98:mXg4NKFC5piV2i43@cluster0.gyqvm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run (){
  try{
       await client.connect();
       const database = client.db('travelWith');
       const servicesCollection = database.collection('services');
       const ordercollection = database.collection('orders');
       // get api 
            app.get('/services',async(req,res)=>{
                const cursor = servicesCollection.find({});
                const services = await cursor.toArray();
                res.send(services);
            });

        //Get single servise
        
        app.get('/services/:id',async(req,res)=>{
            const id = req.params.id;
            console.log('gettin single pro',id);
            const query = {_id: ObjectId(id)};
            const service =  await servicesCollection.findOne(query);
            res.json(service);
        });
        
       //post api
       app.post('/services',async(req,res)=>{
           const service = req.body;
           console.log('hit the api',service);
           const result = await servicesCollection.insertOne(service);
           console.log(result);
           res.json(result);
       });

       //orders
       app.post('./orders',async(req,res)=>{
           const order = req.body;
           console.log('order',order);
           res.send('order procccsed')
       })
       //Delet api
       app.delete('/services/:id',async(req,res)=>{
           const id = req.params.id;
           const qurey = {_id:ObjectId(id)};
           const result = await servicesCollection.deleteOne(qurey);
           res.json(result);
       })
  }
  finally{
      
  }
}

run().catch(console.dir);

app.get ('/',(req,res)=>{
   res.send('Runnig my cam');
});

app.listen(port,()=>{
    console.log('Running on port',port);
})
