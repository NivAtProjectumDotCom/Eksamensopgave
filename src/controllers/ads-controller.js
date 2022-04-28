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
    let productName = req.body?.productName ?? null;
    let price = req.body?.price ?? null;
    // let category_id = req.body?.category_id ?? null;
    // let location_id = req.body?.location_id ?? null;
   // let condition_id = req.body?.condition_id ?? null;
  //  let premiumAd = req.body?.premium_ad ?? null;
 //   let user_id = req.body?.user_id ?? null;
    let city = req.body?.city ?? null;   

  
    // if (createdAt === null || productName === null || price === null || category_id === null)  || location_id === null || condition_id === null || premiumAd === null || user_id === null || city === null) res.status(500).send('ERROR IN BODY');

 
    // let createAdsTSQL = "INSERT INTO sales.userAds (createdAt, productName, price, category_id, location_id, condition_id, premiumAd, user_id, city) VALUES (@createdAt, @productName, @price, @category_id, @location_id, @condition_id, @premium_ad, @user_id, @city)"
    let createAdsTSQL = "INSERT INTO ProgEksamen.userAds (productName, price, City) VALUES (@productName, @price, @City)"


    let result = await dbContext.executeNonQuery(createAdsTSQL, [
       // ['createdAt', TYPES.Timestamp, createdAt], 
       ['productName', TYPES.Text, productName], 
        ['price', TYPES.Decimal, price,], // skal nok ikke være Decimal
       // ['category_id', TYPES.Int, category_id],
     //   ['location_id', TYPES.Int, location_id],
     //   ['condition_id', TYPES.Int, condition_id],
     //   ['premiumAd', TYPES.Binary, premiumAd],
      //  ['user_id', TYPES.Int, user_id],
        ['City', TYPES.Text, city],
    
    ])
  
    res.status(200).json(result); 
});

// delete ads, work in progress

router.delete("/delete", async(req, res) => {
   
   let productId = req.body?.productId ?? null;
   
   let deleteAdTSQL = "DELETE FROM sales.userAds WHERE id = 1" // skal kunne tage et blankt input

   let result = await dbContext.executeNonQuery(deleteAdTSQL, [
      ['productId', TYPES.Int, productId]
   ])

   res.status(200).json(result);

});
 
module.exports = router;