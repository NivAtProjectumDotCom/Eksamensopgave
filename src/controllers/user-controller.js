const express = require("express");
const router = express.Router();
var TYPES = require('tedious').TYPES;
const dbContext = require('../contexts/dbcontext');

/*
This is a controller file, which in this case is to host the routes for the user controller.
This is the endpoints for requests made in regards to the user table of the database.

Without further explaination, this is mostly just examples of how to utilise different types of T-SQL queries using the database context in dbcontext.js
Any other vital information is explained in comments on the functions of this file.
*/


// Get all users - Async express route, so that we can await the promise of the async dbcontext function(s)
router.get("/getall", async (req, res) => {
    // Create T-SQL Query to be executed for a result to be responded upon
    let getAllTSQL = "SELECT * FROM ProgEksamen.users"
    // Execute the query with the executeQuery function, as we expect a resultset of rows of data
    let result = await dbContext.executeQuery(getAllTSQL, null)

    // Respond to the request with the result of the executed query, when the promise has been resolved or rejected.
    // This should probably be split into responding with something different than 200 if the promise is rejected. I just haven't had the time yet.
    res.status(200).json(result);
});

// Get first - Async express route, so that we can await the promise of the async dbcontext function(s)
router.get("/getfirst", async (req, res) => {
    // Just an example of a different query, but exactly the same as the above

    let getAllTSQL = "SELECT TOP(1) * FROM ProgEksamen.users"
    let result = await dbContext.executeQuery(getAllTSQL, null)

    res.status(200).json(result);
});

// Get user by ID - Async express route, so that we can await the promise of the async dbcontext function(s)
// This one also uses url paramters for the get request, this is done by using :userId in the route.
router.get("/:userId", async (req, res) => {
    // Collect the value of the url param
    let userid = req.params?.userId ?? null;

    // Respond with an error if the param isn't set but somehow the endpoint is triggered anyway (Should be impossible though).
    if (userid === null) res.status(500).send('ERROR IN ID PARAM');

    // Create T-SQL Query to be executed for a result to be responded upon. This time including a variable paramter by adding @xxxxx (in this case @userid) to the query.
    let getAllTSQL = "SELECT TOP(1) * FROM ProgEksamen.users WHERE id = @userid"
    // Execute the query with the ExecuteQuery function, as we expect a resultset of rows of data. This time setting an array corresponding the parameters for the request.
    // This is done by creating an array of arrays containing the 3 variable: VariableName, VariableType, VariableValue
    // The params is handled in the function by adding the to the tedious query request.
    let result = await dbContext.executeQuery(getAllTSQL, [
        ['userId', TYPES.Int, userid]
    ]);

    // Respond to the request with the result of the executed query, when the promise has been resolved or rejected.
    // This should probably be split into responding with something different than 200 if the promise is rejected. I just haven't had the time yet.
    res.status(200).json(result);
}); 

// Create user
router.post("/create", async(req, res) => {
    // Collect the value of the body to use for the query parameters
    let username = req.body?.username ?? null;
    let password = req.body?.password ?? null;
    let email = req.body.email ?? null;
 //   let userlevel = req.body?.userlevel ?? null;
   // let followedads = req.body?.followedads ?? null;


    console.log(req.body);

    // Validate the body and respond with error if not valid
    // if (username === null || password === null || email === null || userlevel === null) /* || followedads === null) */ res.status(500).send('ERROR IN BODY');

    // Create T-SQL Query to be executed with a non resultset response. This time including multiple variable paramters by adding multiple @xxxxx (In this case @username, @password, @email, @userlevel, @followedads) to the query.
    let createUserTSQL = "INSERT INTO ProgEksamen.users (email, userName, password)  VALUES (@email, @userName, @password)"
    // Execute the query with the ExecuteNonQuery function, as we do not expect a resultset of rows of data, but rather a success/failed response and a rowCount. This time setting an array corresponding the parameters for the request.
    // This is done by creating an array of arrays containing the 3 variable: VariableName, VariableType, VariableValue
    // The params is handled in the function by adding the to the tedious query request.
    let result = await dbContext.executeNonQuery(createUserTSQL, [
        ['userName', TYPES.VarChar, username], 
       ['password', TYPES.VarChar, password], 
        ['email', TYPES.VarChar, email],
   
    ])

    console.log(result);
  
    // Respond to the request with the result of the executed query, when the promise has been resolved or rejected.
    // This should probably be split into responding with something different than 200 if the promise is rejected. I just haven't had the time yet.
    res.status(200).json({message: `User with id X has been created`});
}); 

// delete user, work in progess
router.delete("/delete", async (req, res) => {


    console.log(req.body)
    let userName = req.body?.userName ?? null;
     let password = req.body?.password ?? null;
    // error handling her
    // joi dev

    let deleteUserTSQL = `DELETE FROM ProgEksamen.users WHERE userName = @userName AND password = @password`; // "2" skal ændres til at tage et blankt input2

    let result = await dbContext.executeNonQuery(deleteUserTSQL, [
        ['userName', TYPES.VarChar, userName],
        ['password', TYPES.VarChar, password]
    ])
    console.log(userName)
    console.log(deleteUserTSQL)
    console.log(result)
    res.status(200).json(result);

});


// update user
router.put("/update", async (req, res) => {

    let password = req.body?.password ?? null;  // params istedet efter nedarvninger eventuelt minus ?
    let userName = req.body?.userName ?? null; // params istedet

    

    let updateUserTSQL = `UPDATE ProgEksamen.users SET userName = @userName WHERE password = @password`;

    console.log(updateUserTSQL)

    let result = await dbContext.executeNonQuery(updateUserTSQL, [
        ['userName', TYPES.VarChar, userName], // En tedious funtkion vi bruger, som ikke er "nødvendig". Der skal læses op på tedious.types/ using parameters, hvor vi søger efter https://stackoverflow.com/questions/50279825/does-tedious-module-for-node-js-have-any-function-for-preventing-sql-injection
        ['password', TYPES.VarChar, password]
    ])

    console.log(result);
    res.status(200).json(result);

});

// request premium
router.put("/request", async (req, res) => {

    let email = req.body?.email ?? null;  // params istedet efter nedarvninger eventuelt minus ?
    let premiumRequest = req.body?.premiumRequest ?? null; // params istedet

    

    let requestTSQL = `UPDATE ProgEksamen.users SET premiumRequest = @premiumRequest WHERE email = @email`;

    console.log(requestTSQL)

    let result = await dbContext.executeNonQuery(requestTSQL, [
        ['email', TYPES.VarChar, email], // En tedious funtkion vi bruger, som ikke er "nødvendig". Der skal læses op på tedious.types/ using parameters, hvor vi søger efter https://stackoverflow.com/questions/50279825/does-tedious-module-for-node-js-have-any-function-for-preventing-sql-injection
        ['premiumRequest', TYPES.Bit, premiumRequest]
    ])

    console.log(result);
    res.status(200).json(result);

});



 // login
 
 router.post("/login", async(req, res) => {
    let password = req.body?.password ?? null;
    let email = req.body.email ?? null;

    if (email === null) res.status(500).send('User not existing');

    let getUserTSQL = `SELECT * FROM ProgEksamen.users WHERE email = @email AND password = @password`;

    let result = await dbContext.executeNonQuery(getUserTSQL, [
        ['email', TYPES.VarChar, email],
        ['password', TYPES.VarChar, password]
    ])
    console.log(email)
    console.log(getUserTSQL)
    console.log(result)
    res.status(200).json(result);

 })

 
module.exports = router;