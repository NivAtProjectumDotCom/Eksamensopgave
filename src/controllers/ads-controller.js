const express = require("express");
const router = express.Router();
var TYPES = require('tedious').TYPES;
const dbContext = require('../contexts/dbcontext');



// Get all users - Async express route, so that we can await the promise of the async dbcontext function(s)
router.get("/getall", async(req, res) => {
   // Create T-SQL Query to be executed for a result to be responded upon
   let getAllTSQL = "SELECT * FROM ProgEksamen.userAds"
   // Execute the query with the executeQuery function, as we expect a resultset of rows of data
   let result = await dbContext.executeQuery(getAllTSQL, null)

   // Respond to the request with the result of the executed query, when the promise has been resolved or rejected.
   // This should probably be split into responding with something different than 200 if the promise is rejected. I just haven't had the time yet.
   res.status(200).json(result);
});

// Create ad
router.post("/create", async(req, res) => {
  
   // let createdAt = req.body?.createdAt ?? null;
   let user_id = req.body?.user_id ?? null;
    let productName = req.body?.productName ?? null;
    let price = req.body?.price ?? null;
    let category = req.body?.category ?? null;
    let condition = req.body?.condition ?? null;
    let location = req.body?.location?? null;
   
    
    console.log(req.body);
  
    // if ( /* createdAt === null || */ productName === null /*|| price === null || category_id === null)  || location_id === null || condition_id === null || premiumAd === null || user_id === null || city === null */ ) res.status(500).send('ERROR IN BODY');

 
    // let createAdsTSQL = "INSERT INTO sales.userAds (createdAt, productName, price, category_id, location_id, condition_id, premiumAd, user_id, city) VALUES (@createdAt, @productName, @price, @category_id, @location_id, @condition_id, @premium_ad, @user_id, @city)"
    let createAdsTSQL = "INSERT INTO ProgEksamen.userAds (user_id, productName, price, category_id, condition_id, location_id) VALUES (@user_id, @productName, @price, @category_id, @condition_id, @location_id)"


    let result = await dbContext.executeNonQuery(createAdsTSQL, [
     ['productName', TYPES.VarChar, productName], 
     ['user_id', TYPES.Int, user_id], 
      ['price', TYPES.Decimal, price,],  
      ['category_id', TYPES.Int, category],
      ['condition_id', TYPES.Int, condition], 
      ['location_id', TYPES.Int, location], 
      
    ])    
   
  
    res.status(200).json(result); 
});
  
// delete ads, work in progress

router.delete("/delete", async(req, res) => {
   
   let productName = req.body?.productName ?? null;
   
   let deleteAdTSQL = "DELETE FROM ProgEksamen.userAds WHERE productName = @productName" // skal kunne tage et blankt input

   let result = await dbContext.executeNonQuery(deleteAdTSQL, [
      ['productName', TYPES.VarChar, productName]

   ])

   res.status(200).json(result);

});

// update ad, fejler med "let paramName = params[i][0]; TypeError: Cannot read properties of undefined (reading '0')" // jeg tror den fejlede fordi at mange værdier var null, og den derfor ikke kunne køre igennem queryen
router.put("/update", async(req, res) => {

   let productName = req.body?.productName ?? null; // optional chaining
   let user_id = req.body?.user_id ?? null;

   let updateAdTSQL = `UPDATE ProgEksamen.userAds SET productName = @productName WHERE user_id = @user_id`;

console.log(updateAdTSQL);

   let result = await dbContext.executeNonQuery(updateAdTSQL, [
       ['productName', TYPES.VarChar, productName]
       ['user_id', TYPES.Int, user_id]
 
   ])
 
 
   console.log(result);
   res.status(200).json(result); 

}); 
 
// filter ad after localtion_id

router.get("/filer", async(req, res) => {

   let locationID = req.body?.locationID ?? null;



   let filterLocation = "SELECT p.productname, price, l.id AS LOCATION_ID, c.id AS CONDITION_ID, ca.id AS CATEGORY_ID FROM ProgEksamen.userAds p INNER JOIN ProgEksamen.location lON l.id = p.location_id INNER JOIN ProgEksamen.condition c ON c.id = p.condition_id INNER JOIN ProgEksamen.category ca ON ca.id = p.category_id WHERE p.productName IS NOT NULL AND l.id = @id";

   let result = await dbContext.executeNonQuery(filterLocation, [
      ['id', TYPES.Int, locationID]
   ])

   console.log(result);
   res.status(200).json(result);
})

 
module.exports = router;