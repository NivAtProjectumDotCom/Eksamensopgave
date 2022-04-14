var Connection = require('tedious').Connection;
var Request = require('tedious').Request

const config = require('./config.json')
var connection = new Connection(config)

connection.on('connect', function(err){
    if (err){
        console.log(err);
    } else {
        console.log("connected");
        const response = executeSQL();
        console.log(response)
    }
});

connection.connect()

/* DETTE ER NICOLAIS KODE. DEN ER KOMMENTERET UD FOR AT NÆSTE KODE KAN KØRE.
function executeSQL(){
    request = new Request("SELECT * FROM ProgEksamen.Users WHERE ID = 4", function(err){
    if (err){
        console.log(err)}})

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
