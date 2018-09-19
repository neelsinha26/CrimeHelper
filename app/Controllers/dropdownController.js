var bodyParser = require('body-parser');
var dropdown = require("../Services/dropdownService.js");

async function getCategories(req, res){

  return dropdown.getCategories(req, res);

}

async function getAreas(req, res){

  return dropdown.getAreas(req, res);

}

async function getRace(req, res){

  return dropdown.getRace(req, res);

}

module.exports =  {
  getCategories : getCategories,
  getAreas : getAreas,
  getRace : getRace
};