var bodyParser = require('body-parser');
var crimes = require("../Services/crimeService.js");

async function getUnsafeAreas(req, res){

  return crimes.getUnsafeAreas(req, res);

}

async function getCrimeAreasCategory(req, res){

	//adjust time format
	req.query.startTime = req.query.startTime.split(":");
	req.query.startTime = req.query.startTime.join("");

	req.query.endTime = req.query.endTime.split(":");
	req.query.endTime = req.query.endTime.join("");


	var data = {
		"cat" : req.query.category,
		"start" : req.query.startTime, 
		"end" : req.query.endTime
	}

	console.log(data);
  return crimes.getCrimeAreasCategory(data, res);

}

async function getChangeInCrime(req, res){

	//adjust time format
	req.query.startDate = new Date(req.query.startDate);
	req.query.endDate = new Date(req.query.endDate);


	var data = {
		"start" : req.query.startDate, 
		"end" : req.query.endDate
	}

	console.log(data);
  return crimes.getChangeInCrime(data, res);

}

async function getChangeInCrimePercent(req, res){

	var data = {
		"start" : req.query.startYear, 
		"end" : req.query.endYear
	}

	console.log(data);
  return crimes.getChangeInCrimePercent(data, res);

}

async function getCrimeRamapantArea(req, res){

	//adjust time format
	req.query.startTime = req.query.startTime.split(":");
	req.query.startTime = req.query.startTime.join("");

	req.query.endTime = req.query.endTime.split(":");
	req.query.endTime = req.query.endTime.join("");

	var data = {
		"cat" : req.query.category,
		"start" : req.query.startTime, 
		"end" : req.query.endTime
	}

	console.log(data);
  return crimes.getCrimeRamapantArea(data, res);

}

async function getCrimeAreasRaceGenderAge(req, res){

	var data = {
		"race" : req.query.race,
		"gender" : req.query.gender,
		"age" : parseInt(req.query.age)

	}
  return crimes.getCrimeAreasRaceGender(data, res);

}

async function getPercentageCrime(req, res){

	var data = {
		"race" : req.query.race,
		"gender" : req.query.gender,
		"age" : parseInt(req.query.age)

	}
  return crimes.getPercentageCrime(data, res);

}

async function getCrimeByArea(req, res){

	var data = {
		"area" : req.query.Area, 
		"page" : req.query.page,
		"perPage" : req.query.perPage

	}
  return crimes.getCrimeByArea(data, res);

}

async function getTopWeaponsUsed(req, res){

  return crimes.getTopWeaponsUsed(req, res);

}

module.exports =  {
  getUnsafeAreas : getUnsafeAreas,
  getCrimeAreasCategory :getCrimeAreasCategory, 
  getCrimeAreasRaceGenderAge : getCrimeAreasRaceGenderAge,
  getCrimeRamapantArea : getCrimeRamapantArea,
  getPercentageCrime : getPercentageCrime,
  getCrimeByArea : getCrimeByArea, 
  getChangeInCrime : getChangeInCrime,
  getChangeInCrimePercent : getChangeInCrimePercent, 
  getTopWeaponsUsed : getTopWeaponsUsed
};