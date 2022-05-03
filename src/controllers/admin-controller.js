const express = require("express");
const router = express.Router();
var TYPES = require('tedious').TYPES;
const dbContext = require('../contexts/dbcontext');

// admin get all users with all data
router.get("/getusers", async(req, res) => {

    let getAllTSQL = "SELECT * FROM ProgEksamen.users"
    let result = await dbContext.executeQuery(getAllTSQL, null)

   
    res.status(200).json(result);
});

// admin get all ads
router.get("/getads", async(req, res) => {

    let getAllTSQL = "SELECT * FROM ProgEksamen.userAds"
    let result = await dbContext.executeQuery(getAllTSQL, null)

   
    res.status(200).json(result);
});

// admin delete user
router.delete("/delete", async(req, res) => {
   
    let userId = req.body?.userId ?? null;
    
    let adminDeleteUserTSQL = "DELETE FROM ProgEksamen.users WHERE id = @id";
 

    console.log(adminDeleteUserTSQL)

    let result = await dbContext.executeNonQuery(adminDeleteUserTSQL, [
       ['id', TYPES.Int, userId]
    ])

    console.log(result);
    res.status(200).json(result);
 
 }); 

// admin update user
router.put("/update", async (req, res) => {

    let userId = req.body?.userId ?? null;  // params istedet efter nedarvninger eventuelt minus ?
    let premiumUser = req.body?.premiumUser ?? null; // params istedet

    

    let adminUpdateUserTSQL = "UPDATE ProgEksamen.users SET premiumUser = @premiumUser WHERE id = @id";

    console.log(adminUpdateUserTSQL)

    let result = await dbContext.executeNonQuery(adminUpdateUserTSQL, [
        ['id', TYPES.Int, userId], // En tedious funtkion vi bruger, som ikke er "nødvendig". Der skal læses op på tedious.types/ using parameters, hvor vi søger efter https://stackoverflow.com/questions/50279825/does-tedious-module-for-node-js-have-any-function-for-preventing-sql-injection
        ['premiumUser', TYPES.VarChar, premiumUser]
    ])

    console.log(result); 
    res.status(200).json(result);

}); 

// admin update top premium user


// admin total ads
router.get("/totalads", async (req, res) => {
    let getTotalTSQL = "SELECT COUNT(id) AS total_ads FROM ProgEksamen.userAds";
    let result = await dbContext.executeQuery(getTotalTSQL, null)

   
    res.status(200).json(result);

})

// admin total ads per user
router.get("/adsperuser", async (req, res) => {
    
    let getAdsPerUserTSQL = "SELECT COUNT(id) AS total_ads_per_user FROM ProgEksamen.userAds WHERE @user_id = @user_id";
    let userId = req.body?.userId ?? null;
    
 

    console.log(getAdsPerUserTSQL)

    let result = await dbContext.executeNonQuery(getAdsPerUserTSQL, [
       ['id', TYPES.Int, userId]
    ])

    console.log(result);
    res.status(200).json(result);

})



module.exports = router;

