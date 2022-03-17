const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// Task 4
app.get('/list/all', (req, res, next) => {
  if(req.query.limit){
      res.status(200).json(shoppingList.slice(0, req.query.limit));
  } else {
      res.status(200).json(shoppingList);
  }
  
});

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