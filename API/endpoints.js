// Get 'Users' from production.brands
app.get('/users', (req, res) => {
    const request = new Request("SELECT * FROM ProgEksamen.Users", function(err){
      if (err){
          console.log(err)
        }
      })
    connection.execSql(request)
    request.on('row', function(columns){
      console.log(columns)
      res.json(true)
    });
  
  
    // Create new user into sales.customers
    app.post('/users', (req, res, next) => {
      const request = new Request("INSERT INTO ProgEksamen.Users (ID, Username, Password, Email, Userlevel, Followed_ads) VALUES () ", function(err){
        if (err){
            console.log(err)
          }
        })
      connection.execSql(request)
      request.on('row', function(columns){
        console.log(columns)
        res.json(true)
      });
    });
  
  // Delete user based on customer_id
    app.delete('/users', (req, res, next) => {
      const request = new Request("DELETE FROM ProgEksamen.Users WHERE Users_ID = '' ", function(err){
        if (err){
            console.log(err)
          }
        })
      connection.execSql(request)
      request.on('row', function(columns){
        console.log(columns)
        res.json(true)
      });
    });
  
  
    // Update all values except customer_id
    app.put('/users', (req, res, next) => {
      const request = new Request("UPDATE FROM ProgEksamen.Users SET '' WHERE = '' ", function(err){
        if (err){
            console.log(err)
          }
        })
      connection.execSql(request)
      request.on('row', function(columns){
        console.log(columns)
        res.json(true)
      });
    });
  
  
  
  })