const { MongoClient } = require('mongodb');
const objectId  = require('mongodb').ObjectId;
const mongoDB_URI = ""

const getUrlsHealth = async (done)=>{
    const uri = mongoDB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    const results  = await client.db("WebHealthDatabase").collection("urlsHealth").find({}).toArray();
    client.close();
    return done(null,results)

}


const saveUrlHealth = async (healthDetails,done)=>{
    const uri = mongoDB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    const results  = await client.db("WebHealthDatabase").collection("urlsHealth").insertOne(healthDetails);
    client.close();
    return done(null,results)
}

const getUrlHealthById = async (healthId,done)=>{
    const uri = mongoDB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    let objId = new objectId(healthId)
    const results  = await client.db("WebHealthDatabase").collection("urlsHealth").findOne({ _id :objId })
    client.close();
    return done(null,results)
}
const updateUrlHealthbyId = async (healthId,data,done)=>{
    const uri = mongoDB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    let objId = new objectId(healthId)
    data._id=objId
    let update = {
        $set : {'Availability': data.Availability,"Latency":data.Latency}
    }
    const results  = await client.db("WebHealthDatabase").collection("urlsHealth").updateOne({ _id :objId },update)
    client.close();
    return done(null,results)
}


//update health using url address, as maybe sometime we don't remember the ID's
const updateUrlHealthbyAddress = async (healthAdd,data,done)=>{
    const uri = mongoDB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    let update = {
        $set : {'url':data.url,'Availability': data.Availability,"Latency":data.Latency}
    }
    let options = {upsert :true}
    const results  = await client.db("WebHealthDatabase").collection("urlsHealth").updateOne({ url :healthAdd },update,options)
    client.close();
    return done(null,results)

}



const deleteUrlHealthbyId = async (healthId,done)=>{
    const uri = mongoDB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    let objId = new objectId(healthId)
    const results  = await client.db("WebHealthDatabase").collection("urlsHealth").deleteOne({ _id :objId })
    client.close();
    return done(null,results)

}


module.exports = {
    getUrlsHealth,saveUrlHealth,getUrlHealthById,updateUrlHealthbyId,deleteUrlHealthbyId,updateUrlHealthbyAddress
  }