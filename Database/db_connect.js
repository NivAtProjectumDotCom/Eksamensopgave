var Connection = require('tedious').Connection;


const config = require('../config.json')
var connection = new Connection(config)

connection.on('connect', function(err){
    if (err){
        console.log(err);
    } else {
        console.log("connected");
    }
});

connection.connect()

module.exports = connection
