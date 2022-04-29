// Her kan vi skrive admins funktionalitet. 

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
   
   // let userName = req.body?.userName ?? null; 
    let userId = req.body?.password ?? null;
    
    let deleteUserTSQL = `DELETE FROM ProgEksamen.users WHERE id = @userId`; // "2" skal ændres til at tage et blankt input2
 
    let result = await dbContext.executeNonQuery(deleteUserTSQL, [
      // ['userName', TYPES.VarChar, userName] 
       ['userId', TYPES.Int, userId]
    ])
 
    res.status(200).json(result);
 
 }); 

// admin update user

// admin update top premium user

