const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
const PORT = 4000;

const schema = buildSchema(`
  type Product {
    id: Int
    name: String
    price: Float
    description: String
    categories: [String]
  }

  type Query {
    products: [Product]
  }
`);

const getProducts = () => {
  const data = fs.readFileSync(path.join(__dirname, '../app/shared/products.json'));
  return JSON.parse(data);
};

const root = {
  products: () => getProducts()
};

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));


app.listen(PORT, () => {
  console.log(`GraphQL работает на http://localhost:${PORT}/graphql`);
});
