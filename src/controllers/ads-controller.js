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
    let category = req.body?.category ?? null;
    let condition = req.body?.condition ?? null;
    let location = req.body?.location?? null;
    
    console.log(req.body);
  
    // if ( /* createdAt === null || */ productName === null /*|| price === null || category_id === null)  || location_id === null || condition_id === null || premiumAd === null || user_id === null || city === null */ ) res.status(500).send('ERROR IN BODY');

 
    // let createAdsTSQL = "INSERT INTO sales.userAds (createdAt, productName, price, category_id, location_id, condition_id, premiumAd, user_id, city) VALUES (@createdAt, @productName, @price, @category_id, @location_id, @condition_id, @premium_ad, @user_id, @city)"
    let createAdsTSQL = "INSERT INTO ProgEksamen.userAds (productName, price, category_id, condition_id, location_id) VALUES (@productName, @price, @category_id, @condition_id, @location_id)"


    let result = await dbContext.executeNonQuery(createAdsTSQL, [
     ['productName', TYPES.VarChar, productName], 
      ['price', TYPES.Decimal, price,], // skal nok ikke være Decimal
      ['category_id', TYPES.VarChar, category],
      ['condition_id', TYPES.VarChar, condition],
      ['location_id', TYPES.VarChar, location],
      
    ])   
  
  
    res.status(200).json(result); 
});
  
// delete ads, work in progress

router.delete("/delete", async(req, res) => {
   
   let productId = req.body?.productId ?? null;
   
   let deleteAdTSQL = "DELETE FROM ProgEksamen.userAds WHERE id = $id" // skal kunne tage et blankt input

   let result = await dbContext.executeNonQuery(deleteAdTSQL, [
      ['productId', TYPES.Int, productId]
   ])

   res.status(200).json(result);

});

// update ad
router.put("/update", async(req, res) => {

   let productName = req.body?.productName ?? null;
   let          id = req.body?.id ?? null;

   let updateAdTSQL = "UPDATE ProgEksamen.userAds SET productName = @productName WHERE id = @id";

   let result = await dbContext.executeNonQuery(updateAdTSQL, [
       ['productName', TYPES.VarChar, productName]
       ['id', TYPES.Int, id]

   ])


   console.log(result);
   res.status(200).json(result);

}); 


// DISSE TRE ENDPOINTS VIRKER IKKE, MEN QUERYEN VIRKER I SQL! VI SKAL HAVE HJÆLP TIL DEM:-)

// filter ad after localtion_id
router.get("/filerlocation", async(req, res) => {

   let filterLocation = "SELECT p.productname, price, l.id AS LOCATION_ID, c.id AS CONDITION_ID, ca.id AS CATEGORY_ID FROM ProgEksamen.userAds p INNER JOIN ProgEksamen.location lON l.id = p.location_id INNER JOIN ProgEksamen.condition c ON c.id = p.condition_id INNER JOIN ProgEksamen.category ca ON ca.id = p.category_id WHERE p.productName IS NOT NULL AND l.id = 3";
   let locationID = req.body?.id ?? null;

   let result = await dbContext.executeNonQuery(filterLocation, [
      ['id', TYPES.Int, locationID]
   ])

   console.log(result);
   res.status(200).json(result);
});

// filter ad after condition_id 
router.get("/filercondition", async(req, res) => {

   let filterCondition = "SELECT p.productname, price, l.id AS LOCATION_ID, c.id AS CONDITION_ID, ca.id AS CATEGORY_ID FROM ProgEksamen.userAds p INNER JOIN ProgEksamen.location lON l.id = p.location_id INNER JOIN ProgEksamen.condition c ON c.id = p.condition_id INNER JOIN ProgEksamen.category ca ON ca.id = p.category_id WHERE p.productName IS NOT NULL AND c.id = 2";
   let conditionID = req.body?.id ?? null;

   let result = await dbContext.executeNonQuery(filterCondition, [
      ['id', TYPES.Int, conditionID]
   ])

   console.log(result);
   res.status(200).json(result);
});

router.get("/filercategory", async(req, res) => {

   let filterCategory = "SELECT p.productname, price, l.id AS LOCATION_ID, c.id AS CONDITION_ID, ca.id AS CATEGORY_ID FROM ProgEksamen.userAds p INNER JOIN ProgEksamen.location lON l.id = p.location_id INNER JOIN ProgEksamen.condition c ON c.id = p.condition_id INNER JOIN ProgEksamen.category ca ON ca.id = p.category_id WHERE p.productName IS NOT NULL AND ca.id = 1";
   let categoryID = req.body?.id ?? null;

   let result = await dbContext.executeNonQuery(filterCategory [
      ['id', TYPES.Int, categoryID]
   ])

   console.log(result);
   res.status(200).json(result);
});






 
module.exports = router;