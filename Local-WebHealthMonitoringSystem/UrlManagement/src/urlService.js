const { MongoClient } = require('mongodb');
const objectId  = require('mongodb').ObjectId;
const mongoDB_URI = ""



const getUrls = async (done)=>{
    const uri = mongoDB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    const results  = await client.db("WebHealthDatabase").collection("urls").find({}).toArray();
    client.close();
    return done(null,results)

}



const saveUrl = async (urlDetails,done)=>{
    const uri = mongoDB_URI;
    const client = new MongoClient(uri);
    await client.connect();

    const results  = await client.db("WebHealthDatabase").collection("urls").insertOne(urlDetails);
    client.close();
    return done(null,results)

}

const getUrlById = async (urlId,done)=>{
    const uri = mongoDB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    let objId = new objectId(urlId)
    const results  = await client.db("WebHealthDatabase").collection("urls").findOne({ _id :objId })
    client.close();
    return done(null,results)

}
const updateUrlbyId = async (urlId,data,done)=>{
    const uri = mongoDB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    let objId = new objectId(urlId)
    data._id=objId
    let update = {
        $set : {'url': data.url}
    }
    const results  = await client.db("WebHealthDatabase").collection("urls").updateOne({ _id :objId },update)
    client.close();
    return done(null,results)

}
const deleteUrlbyId = async (urlId,done)=>{
    const uri = mongoDB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    let objId = new objectId(urlId)

    const results  = await client.db("WebHealthDatabase").collection("urls").deleteOne({ _id :objId })
    client.close();
    return done(null,results)

}

module.exports = {
    getUrls,saveUrl,getUrlById,updateUrlbyId,deleteUrlbyId
  }