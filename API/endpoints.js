// Get 'Users' from production.brands
app.get('/users', (req, res) => {
    const request = new Request("SELECT * FROM sales.customers", function(err){
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
      const request = new Request("INSERT INTO sales.customers (customer_id, first_name, last_name, phone, email, street, city, state, zip_code) VALUES () ", function(err){
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
      const request = new Request("DELETE FROM sales.customers WHERE customer_id = '' ", function(err){
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
      const request = new Request("UPDATE FROM sales.customers SET '' WHERE = '' ", function(err){
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