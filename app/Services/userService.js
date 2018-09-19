var oracledb = require('oracledb');
var bodyParser = require('body-parser');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

export function getAll(req, res)
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
	      `SELECT *
	       FROM BANKA.USER_TABLE`,
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
	       	var userData = {
	       		users : result.rows
	       	}
	        res.send(userData, 201);
	        doRelease(connection);
	      });
	  });
}


export function getTableCount(req, res)
{
	var oracledb = require('oracledb');
	var dbConfig = require('./../../CONFIG.json');

	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : dbConfig.user2,
	    password      : dbConfig.password2,
	    connectString : dbConfig.connectString
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute
	      `select
			   table_name,
			   to_number(
			   extractvalue(
			      xmltype(
			         dbms_xmlgen.getxml('select count(*) c from '||table_name))
			    ,'/ROWSET/ROW/C')) count
			from 
			   user_tables
			order by 
			   table_name`,
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
	       	var tableCount = {
	       		TableCounts : result.rows
	       	}

	       	//generate total entry count
	       	
	       	var sum = 0;

	       	for (var i = 0; i < tableCount.TableCounts.length; i++)
	       	{
	       		sum = sum + tableCount.TableCounts[i].COUNT;
	       	}

	       	tableCount.TableCounts.push({"TABLE_NAME": "SUM", "COUNT": sum});

	        res.send(tableCount, 201);
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