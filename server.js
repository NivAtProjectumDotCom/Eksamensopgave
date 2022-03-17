const { Router } = require('express')
const express = require('express')
const app = express()
var Connection = require('tedious').Connection;
var Request = require('tedious').Request
const connection = require('./Database/db_connect')
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Task 4
app.get('/users', (req, res) => {
  const request = new Request("SELECT * FROM production.brands", function(err){
    if (err){
        console.log(err)
      }
    })
  connection.execSql(request)
  request.on('row', function(columns){
    console.log(columns)
    res.json(true)
  });

})

/*
function executeSQL(){
    request = new Request("SELECT * FROM production.brands", function(err){
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

// Task 5
app.post('/list', (req, res, next) => {
  const newItem = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      shop: req.body.shop
  };

  shoppingList.push(newItem);

  res.status(201).json(shoppingList);
});

// Task 6
app.delete('/list/all', (req, res, next) => {
  shoppingList.length = 0;
  res.status(204).send();
});

// Task 7
app.put('/list/:id', (req, res, next) => {
  const oldItemIndex = shoppingList.findIndex(item => item.id == req.params.id);
  const newItem = req.body;
  shoppingList[oldItemIndex] = newItem;
  res.status(204).json(shoppingList[oldItemIndex]);
});

// Task 8
app.get('/list/:id', (req, res, next) => {
  const foundItem = shoppingList.find(item => item.id == req.params.id) || [];
  res.status(200).json(foundItem);
});

