const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const PRODUCTS_PATH = path.join(__dirname, '..', 'shared', 'products.json');

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/products', (req, res) => {
  const data = fs.readFileSync(PRODUCTS_PATH);
  res.json(JSON.parse(data));
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
