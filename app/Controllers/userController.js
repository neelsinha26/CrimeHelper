var bodyParser = require('body-parser');
var user = require("../Services/userService.js");

async function getUsers(req, res){

  return user.getAll(req, res);

}

async function getTableCount(req, res){

  return user.getTableCount(req, res);

}



module.exports =  {
  getUsers : getUsers,
  getTableCount : getTableCount
};