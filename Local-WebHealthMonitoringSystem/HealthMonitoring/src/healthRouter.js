const express = require("express")
const router = express.Router()
const healthController = require('./healthController')

router.get("/", (req, res) => {
    try {
      healthController.getUrlsHealth((err, results) => {
        if(err){
          return res.status(400).send(err)
         }
         return res.status(200).send({STATUS:"OK", data:results})
      });
    } catch (err) {
     return res.status(400).send("ERROR:: Please try again after sometime "+err)
    }
  });

  router.post("/", (req, res) => {
    try {
      const urlHealthDetails = {
            "url": req.body.url,
            "Availability": req.body.Availability,
            "Latency": req.body.Latency,
      }
      healthController.saveUrlHealth(urlHealthDetails, (err, results) => {
        if (err){
          return  res.status(400).send(err)
       }
       return res.status(201).send({STATUS:"OK",data:results})
  
      });
  
    } catch (err) {
     return res.status(400).send("ERROR:: Please try again after sometime"+err)
    }
  });

  router.get("/:healthId", (req, res) => {
    try {
      const healthId = req.params.healthId;

      healthController.getUrlHealthById(healthId, (err, results) => {
        if (err){
          return  res.status(400).send(err)
       }
       return res.status(200).send({STATUS:"OK",data:results})
  
      });
  
    } catch (err) {
     return res.status(400).send("ERROR:: Please try again after sometime"+err)
    }
  });

  router.put("/:healthId", (req, res) => {
    try {
       const healthId = req.params.healthId;
      const HealthDetails = {
        "_id": healthId,
        "url": req.body.url,
        "Availability": req.body.Availability,
        "Latency": req.body.Latency,
      }
      healthController.updateUrlHealthbyId(healthId, HealthDetails, (err, results) => {
        if (err){
          return  res.status(400).send(err)
       }
       return res.status(200).send({STATUS:"OK",data:results})
      });
  
    } catch (err) {
      return res.status(400).send("ERROR:: Please try again after sometime"+err)
    }
  });

  router.delete("/:healthId", (req, res) => {
    try {
      const healthId = req.params.healthId;

      healthController.deleteUrlHealthbyId(healthId, (err, results) => {
        if (err){
          return  res.status(400).send(err)
       }
       return res.status(200).send({STATUS:"OK",data:results})
  
      });
  
    } catch (err) {
     return res.status(400).send("ERROR:: Please try again after sometime"+err)
    }
  });

  
  router.post("/urlAdd:url", (req, res) => {
    try {
       const url = req.params.url;
      const healthDetails = {
        "url": url,
        "Availability": req.body.Availability,
        "Latency": req.body.Latency,
      }
      healthController.updateUrlHealthbyAddress(url, healthDetails, (err, results) => {
        if (err){
          return  res.status(400).send(err)
       }
       return res.status(200).send({STATUS:"OK",data:results})
      });
  
    } catch (err) {
      return res.status(400).send("ERROR:: Please try again after sometime"+err)
    }
  });
  module.exports = router;