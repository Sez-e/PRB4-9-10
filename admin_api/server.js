const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;
const DATA_PATH = path.join(__dirname, '..', 'shared', 'products.json');

app.use(express.json());

// Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'api-spec.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// GET
app.get('/api/products', (req, res) => {
  const data = fs.readFileSync(DATA_PATH);
  res.json(JSON.parse(data));
});

// Post
app.post('/api/products', (req, res) => {
  const products = JSON.parse(fs.readFileSync(DATA_PATH));
  const newItems = Array.isArray(req.body) ? req.body : [req.body];
  const newIds = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

  newItems.forEach((item, index) => {
    item.id = newIds + index;
    products.push(item);
  });

  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
  res.status(201).json({ message: 'Товары добавлены', count: newItems.length });
});

// Put
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let products = JSON.parse(fs.readFileSync(DATA_PATH));
  const index = products.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ error: 'Товар не найден' });

  products[index] = { ...products[index], ...req.body, id };
  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
  res.json({ message: 'Товар обновлен' });
});

// Delete
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let products = JSON.parse(fs.readFileSync(DATA_PATH));
  const newProducts = products.filter(p => p.id !== id);

  if (products.length === newProducts.length) return res.status(404).json({ error: 'Товар не найден' });

  fs.writeFileSync(DATA_PATH, JSON.stringify(newProducts, null, 2));
  res.json({ message: 'Товар удален' });
});

app.listen(PORT, () => {
  console.log(`Admin API server running at http://localhost:${PORT}`);
});