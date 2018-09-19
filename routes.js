import {getUsers, getTableCount} from './app/Controllers/userController.js';
import {getCategories, getAreas, getRace} from './app/Controllers/dropdownController.js';
import {getUnsafeAreas, getCrimeAreasCategory, getCrimeAreasRaceGenderAge, getCrimeRamapantArea, getPercentageCrime, getCrimeByArea, getChangeInCrime, getChangeInCrimePercent, getTopWeaponsUsed} from './app/Controllers/crimeController.js';
var bodyParser = require('body-parser');

module.exports = function(app) {

  //user endpoints

  app.get('/api/v1/getAllUsers', function(req, res){
    var rows = getUsers(req, res);
  });

  //crime area endpints

  app.get('/api/v1/getUnsafeAreas', function(req, res){
    var rows = getUnsafeAreas(req, res);
    
  });

  app.get('/api/v1/getCrimeAreasCategory', function(req, res){
    console.log(req.query);
    var rows = getCrimeAreasCategory(req, res);
  });

  app.get('/api/v1/getCrimeRamapantArea', function(req, res){
    console.log(req.query);
    var rows = getCrimeRamapantArea(req, res);
  });

  app.get('/api/v1/getCrimeAreas/RaceGenderAge', function(req, res){
    var rows = getCrimeAreasRaceGenderAge(req, res);
  });

  app.get('/api/v1/getPercentageCrime/RaceGenderAge', function(req, res){
    console.log("Race AGE GENDER");
    var rows = getPercentageCrime(req, res);
  });

  app.get('/api/v1/getTableEntryCount', function(req, res){
    var rows = getTableCount(req, res);
  });


  app.get('/api/v1/getCrimesByArea', function(req, res){
    var rows = getCrimeByArea(req, res);
  });

  app.get('/api/v1/getChangeInCrime', function(req, res){
    var rows = getChangeInCrime(req, res);
  });

  app.get('/api/v1/getChangeInCrimePercent', function(req, res){
    var rows = getChangeInCrimePercent(req, res);
  });

  app.get('/api/v1/getTopWeaponsUsed', function(req, res){
    var rows = getTopWeaponsUsed(req, res);
  });

  // dropdown endpoints

  app.get('/api/v1/getCategories', function(req, res){
    var rows = getCategories(req, res);
  });


  app.get('/api/v1/getAreas', function(req, res){
    var rows = getAreas(req, res);
  });

  app.get('/api/v1/getRace', function(req, res){
    var rows = getRace(req, res);
  });

};