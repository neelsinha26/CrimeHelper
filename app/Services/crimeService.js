var oracledb = require('oracledb');
var bodyParser = require('body-parser');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

export function getCrimeAreasCategory(req, res)
{
	var oracledb = require('oracledb');
	var dbConfig = require('./../../CONFIG.json');
	var startT = (parseInt(req.page) - 1) * req.perPage;
	var endT = (parseInt(req.perPage) * parseInt(req.page))
	console.log(startT + ' ' +endT);
	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute
	      `SELECT * FROM (select AREA_NAME, COUNT(*) AS NUM  
        from SSWAPNIL.crime_master , SSWAPNIL.area_info , SSWAPNIL.crime_description 
        WHERE SSWAPNIL.crime_description.crimedescription LIKE :cat
        and SSWAPNIL.crime_master.area_id = SSWAPNIL.area_info.area_id
        and SSWAPNIL.crime_description.crimecode = SSWAPNIL.crime_master.crime_code
        AND TIME_OCCURRED>=:startTime AND TIME_OCCURRED<:endTime
        GROUP BY AREA_NAME ORDER BY NUM DESC ) WHERE ROWNUM<6`,
        {cat : '%' + req.cat + '%', startTime : req.start, endTime : req.end},

	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	       	var areas = {
	       		areas : result.rows
	       	}
	        res.send(areas, 201);
	        doRelease(connection);
	      });
	  });
}


export function getCrimeRamapantArea(req, res)
{
	var oracledb = require('oracledb');
	var dbConfig = require('./../../CONFIG.json');
	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute

	      `
	      SELECT * FROM (select AREA_NAME, COUNT(*) AS NUM  
        from SSWAPNIL.crime_master , SSWAPNIL.area_info , SSWAPNIL.crime_description 
        WHERE SSWAPNIL.crime_description.crimedescription LIKE :cat
        and SSWAPNIL.crime_master.area_id = SSWAPNIL.area_info.area_id
        and SSWAPNIL.crime_description.crimecode = SSWAPNIL.crime_master.crime_code
        AND TIME_OCCURRED>=:startTime AND TIME_OCCURRED<:endTime
        GROUP BY AREA_NAME ORDER BY NUM DESC ) WHERE ROWNUM<6`,
        {cat : '%' + req.cat + '%', startTime : req.start, endTime : req.end},

	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	       	var areas = {
	       		areas : result.rows
	       	}
	        res.send(areas, 201);
	        doRelease(connection);
	      });
	  });
}

export function getCrimeAreasRaceGender(req, res)
{
	var oracledb = require('oracledb');
	var dbConfig = require('./../../CONFIG.json');

	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute
	      `SELECT AREA, NO FROM (SELECT COUNT(*) AS No, c.AREA_NAME AS AREA FROM SSWAPNIL.CRIME_MASTER A, SSWAPNIL.VICTIM_INFO B,SSWAPNIL.area_info c WHERE B.CRIMEID = A.DR_NUMBER AND a.Area_id = c.area_id and  B.RACE = :race AND B.SEX = :gen AND   B.AGE > :age
			GROUP BY c.AREA_NAME ORDER BY No DESC) WHERE ROWNUM < 6`,
        {race : req.race, gen : req.gender, age : parseInt(req.age)},

	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	       	var areas = {
	       		areas : result.rows
	       	}
	        res.send(areas, 201);
	        doRelease(connection);
	      });
	  });
}

export function getCrimeByArea(req, res)
{
	var oracledb = require('oracledb');
	var dbConfig = require('./../../CONFIG.json');
	var startT = (parseInt(req.page) - 1) * req.perPage;
	var endT = (parseInt(req.perPage) * parseInt(req.page))

	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute
	      `Select * from (select b.st_addr, a.date_occurred, a.time_occurred, c.crimedescription, rank() over (ORDER by a.dr_number DESC) rn from SSWAPNIL.crime_master a, SSWAPNIL.place_info b, SSWAPNIL.crime_description c, SSWAPNIL.weapon d, SSWAPNIL.area_info e where 
			a.area_id = e.area_id 
			and a.place_id = b.place_id 
			and a.crime_code = c.crimecode 
			and a.weapon_used_code = d.weapon_id 
			and e.area_name = :area) WHERE rn between :n and :m order by rn`,
        {area : req.area, n : startT, m : endT},

	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	       	var areas = {
	       		areas : result.rows
	       	}
	        res.send(areas, 201);
	        doRelease(connection);
	      });
	  });
}

export function getChangeInCrime(req, res)
{
	var oracledb = require('oracledb');
	var dbConfig = require('./../../CONFIG.json');

	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute
	      `SELECT count(*), DATE_OCCURRED FROM SSWAPNIL.CRIME_MASTER
			WHERE DATE_OCCURRED <= :endDate
			AND DATE_OCCURRED > :startDate
			group by DATE_OCCURRED order by DATE_OCCURRED`,
        {startDate : req.start,  endDate : req.end},

	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	       	var dates = {
	       		CrimeDates : result.rows
	       	}
	        res.send(dates, 201);
	        doRelease(connection);
	      });
	  });
}

getChangeInCrimePercent

export function getChangeInCrimePercent(req, res)
{
	var oracledb = require('oracledb');
	var dbConfig = require('./../../CONFIG.json');

	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute
	      `Select A.F1 AS FIRST,B.F2 AS SECOND, ((B.F2-A.F1)/A.F1)*100 AS PERCENTAGE_CHANGE from 
( Select count(*)as F1 from SSWAPNIL.crime_master where  Extract(year from DATE_OCCURRED) = :startYear )  A,
( Select count(*) as F2 from SSWAPNIL.crime_master where  Extract(year from DATE_OCCURRED)= :endYear ) B
`,
        {startYear : req.start,  endYear : req.end},

	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	       	var dates = {
	       		ChangePercent : result.rows
	       	}
	        res.send(dates, 201);
	        doRelease(connection);
	      });
	  });
}


export function getPercentageCrime(req, res)
{
	var oracledb = require('oracledb');
	var dbConfig = require('./../../CONFIG.json');

	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute
	      `SELECT AREA_NAME,(SPECIFIC_CRIME_NUMBER/AREA_CRIME_NUMBER)*100 as percentage FROM
(			SELECT AREA_NAME, COUNT(*) AS AREA_CRIME_NUMBER FROM SSWAPNIL.CRIME_MASTER x, SSWAPNIL.Area_info y
			WHERE  x.area_id = y.area_id and
			AREA_NAME IN
			(SELECT AREA FROM
				(SELECT c.AREA_NAME  AS AREA ,COUNT(*) AS No FROM SSWAPNIL.CRIME_MASTER A, SSWAPNIL.VICTIM_INFO B, SSWAPNIL.area_info c
				WHERE B.CRIMEID = A.DR_NUMBER
				AND c.area_id = a.area_id
				AND   B.RACE = :race 
				and B.SEX = :gen
				AND   B.AGE >= :age
				GROUP BY c.AREA_NAME ORDER BY No DESC) WHERE ROWNUM<6)
				GROUP BY AREA_NAME ORDER BY AREA_CRIME_NUMBER DESC) A,
			
			(SELECT AREA, No AS SPECIFIC_CRIME_NUMBER from(SELECT c.AREA_NAME AS AREA , COUNT(*) AS No FROM SSWAPNIL.CRIME_MASTER A, SSWAPNIL.VICTIM_INFO B, SSWAPNIL.area_info c
				WHERE B.CRIMEID = A.DR_NUMBER
				AND c.area_id = a.area_id
				AND   B.RACE = :race 
				 and B.SEX = :gen
				AND   B.AGE >= :age
				GROUP BY c.AREA_NAME ORDER BY No DESC) where rownum<6) B
				WHERE A.AREA_NAME = B.AREA order by percentage desc`,
        {race : req.race, gen : req.gender, age : req.age},

	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	       	var areas = {
	       		areas : result.rows
	       	}
	        res.send(areas, 201);
	        doRelease(connection);
	      });
	  });
}


export function getUnsafeAreas(req, res)
{
	var oracledb = require('oracledb');
	var dbConfig = require('./../../CONFIG.json');

	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute
	      `select area_name,count(*) from ( select 
a.area_name, m.dr_number from SSWAPNIL.crime_master m , SSWAPNIL.area_info a where m.area_id = a.area_id )
group by area_name  order by count(*) desc`,
	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	       	var areas = {
	       		areas : result.rows
	       	}
	        res.send(areas, 201);
	        doRelease(connection);
	      });
	  });
}

export function getTopWeaponsUsed(req, res)
{
	var oracledb = require('oracledb');
	var dbConfig = require('./../../CONFIG.json');

	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute
	      `select weapon_name , times_used from (
select b.name as weapon_name , count(*) as times_used from SSWAPNIL.crime_master a,
SSWAPNIL.weapon b where a.weapon_used_code = b.weapon_id 
and b.name not in ('STRONG-ARM (HANDS, FIST, FEET OR BODILY FORCE)','VERBAL THREAT','UNKNOWN WEAPON/OTHER WEAPON')
group by b.name order by count(*) desc) where rownum <11`,
	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	       	var data = {
	       		weapons : result.rows
	       	}
	        res.send(data, 201);
	        doRelease(connection);
	      });
	  });
}

// Note: connections should always be released when not needed
function doRelease(connection) {
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}