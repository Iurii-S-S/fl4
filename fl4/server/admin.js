// /server/admin.js
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productsRoute = require('./products');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql');
const setupChat = require('./chat');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());

// REST API для продуктов
app.use('/api/products', productsRoute);

// Добавляем GraphQL API
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, // разрешаем использование GraphiQL
}));

setupChat(server);

const PORT_ADMIN = 8080;
server.listen(PORT_ADMIN, () => {
    console.log(`Admin API is running on http://localhost:${PORT_ADMIN}`);
});

// Frontend setup...