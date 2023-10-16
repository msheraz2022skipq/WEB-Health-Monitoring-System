const urlService = require("./urlService");

const getUrls = (done) => {
  urlService.getUrls(done).then((done) => {
    return done;
  });
};
const saveUrl = (urlDetails,done) => {
  urlService.saveUrl(urlDetails,done).then((done) => {
    return done;
  });
};

const getUrlById = (urlId,done) => {
  urlService.getUrlById(urlId,done)
};

const updateUrlbyId = (urlId,urlDetails,done) => {
  urlService.updateUrlbyId(urlId,urlDetails,done)
};
const deleteUrlbyId = (urlId,done) => {
  urlService.deleteUrlbyId(urlId,done)
};

module.exports = {
  getUrls,saveUrl,getUrlById,updateUrlbyId,deleteUrlbyId
};