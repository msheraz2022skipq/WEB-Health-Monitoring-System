const healthService = require("./healthService");

const getUrlsHealth = (done) => {
    healthService.getUrlsHealth(done).then((done) => {
      return done;
    });
  };

  const saveUrlHealth = (healthDetails,done) => {
    healthService.saveUrlHealth(healthDetails,done).then((done) => {
      return done;
    });
  };

  const getUrlHealthById = (healthId,done) => {
    healthService.getUrlHealthById(healthId,done)
  };

  const updateUrlHealthbyId = (healthId,healthDetails,done) => {
    healthService.updateUrlHealthbyId(healthId,healthDetails,done)
  };

  const updateUrlHealthbyAddress = (add,healthDetails,done) => {
    healthService.updateUrlHealthbyAddress(add,healthDetails,done)
  };
  
  const deleteUrlHealthbyId = (healthId,done) => {
    healthService.deleteUrlHealthbyId(healthId,done)
  };

  
  module.exports = {
    getUrlsHealth,saveUrlHealth,getUrlHealthById,updateUrlHealthbyId,deleteUrlHealthbyId,updateUrlHealthbyAddress
  };