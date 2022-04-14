const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('./dbcontextconfig.json');

const executeQuery = (query, params) => new Promise(
    (resolve, reject) => {
        let response = [];
        let rowCounter = 0;

        // Create Request
        let req = new Request(query, (err) => {
            if (err) reject(err);
            resolve(response);
        });

        req.on('row', function(columns) {
            response[rowCounter] = {}
            columns.forEach(function(column) {
                response[rowCounter][column.metadata.colName] = column.value
            });
            rowCounter += 1
        });

        // Create Connection
        let conn = new Connection(config);
        conn.on('connect', (err) => {
            if (err) reject(err);
            conn.execSql(req)
        });

        conn.connect();
    });

module.exports.executeQuery = executeQuery;

const executeNonQuery = (query, params) => new Promise(
    (resolve, reject) => {
        let response = [];
        let rowCounter = 0;

        // Create Request
        let req = new Request(query, (err) => {
            if (err) reject(err);
            resolve(response);
        });

        for (let i = 0; i < params.length; i++) {
            let paramName = params[i][0];
            let paramType = params[i][1];
            let paramValue = params[i][2];

            req.addParameter(paramName, paramType, paramValue);
        }

        req.on('row', function(columns) {
            response[rowCounter] = {}
            columns.forEach(function(column) {
                response[rowCounter][column.metadata.colName] = column.value
            });
            rowCounter += 1
        });

        // Create Connection
        let conn = new Connection(config);
        conn.on('connect', (err) => {
            if (err) reject(err);
            conn.execSql(req)
        });

        conn.connect();
    });



/* FUNKTION TIL AT INDSÆTTE EN BRUGER IND I DATABASEN. DEN VIRKER, MORTEN BLEV SAT IND :-)
function executeSQL(){
    request = new Request("INSERT INTO ProgEksamen.Users (ID, Username, Password, Email, Userlevel, Followed_ads) VALUES (@ID, @Username, @Password, @Email, @Userlevel, @Followed_ads)", function(err){
    if (err){
        console.log(err)}})
        request.addParameter("ID", TYPES.Int, 4);
            request.addParameter("Username", TYPES.VarChar, 'Morten');
            request.addParameter("Password", TYPES.VarChar, 'Morten123');
            request.addParameter("Email", TYPES.VarChar, 'Mortenjensen@gmail.com');
            request.addParameter("Userlevel", TYPES.Int, 1);
            request.addParameter("Followed_ads", TYPES.Int, 3);



    connection.execSql(request)
    var counter = 1
    response = {}
    request.on('row', function(columns){
        response[counter] = {}
        columns.forEach(function(column){
            response[counter][column.metadata.colName] = column.value
        });
        counter += 1
    });
    return response
};


*/


module.exports.executeNonQuery = executeNonQuery;