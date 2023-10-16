const express = require("express")
const router = express.Router()
const urlController = require('./urlController')




router.get("/", (req, res) => {
    try {
      urlController.getUrls((err, results) => {

        if(err){
          return res.status(400).send(err)
         }
         return res.status(200).send({STATUS:"OK", data:results})
        
      });
  
    } catch (err) {
     return res.status(400).send("Error:: Plrease try again after sometime "+err)
    }
  });

  router.post("/", (req, res) => {
    try {
      const urlDetails = {
            "url": req.body.url,
      }
      urlController.saveUrl(urlDetails, (err, results) => {
        if (err){
          return  res.status(400).send(err)
       }
       return res.status(201).send({STATUS:"OK",data:results})
  
      });
  
    } catch (err) {
     return res.status(400).send("Error:: Plrease try again after sometime "+err)
    }
  });

  router.get("/:urlId", (req, res) => {
    try {

      const urlId = req.params.urlId;
      urlController.getUrlById(urlId, (err, results) => {
        if (err){
          return  res.status(400).send(err)
       }
       return res.status(200).send({STATUS:"OK",data:results})
  
      });
  
    } catch (err) {
     return res.status(400).send("Error:: Plrease try again after sometime "+err)
    }
  });


  router.put("/:urlId", (req, res) => {
    try {
       const urlId = req.params.urlId;
      
      const urlDetails = {
        "_id": urlId,
        "url": req.body.url,
      }
      urlController.updateUrlbyId(urlId, urlDetails, (err, results) => {
        if (err){
          return  res.status(400).send(err)
       }
       return res.status(200).send({STATUS:"OK",data:results})
  
      
      });
  
    } catch (err) {
      return res.status(400).send("Error:: Plrease try again after sometime "+err)
    }
  });

  router.delete("/:urlId", (req, res) => {
    try {

      const urlId = req.params.urlId;

      urlController.deleteUrlbyId(urlId, (err, results) => {
        if (err){
          return  res.status(400).send(err)
       }
       return res.status(200).send({STATUS:"OK",data:results})
  
      });
  
    } catch (err) {
     return res.status(400).send("Error:: Plrease try again after sometime "+err)
    }
  });



  module.exports = router;