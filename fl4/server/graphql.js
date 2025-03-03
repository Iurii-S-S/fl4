// /server/graphql.js
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql');
const fs = require('fs');
const path = require('path');

// Путь к JSON файлу
const dataPath = path.join(__dirname, '../data/products.json');

// Определение типов
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
    },
});

// Определение корневого запроса
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                const data = fs.readFileSync(dataPath, 'utf8');
                return JSON.parse(data);
            },
        },
    },
});

// Определение схемы
module.exports = new GraphQLSchema({
    query: RootQuery,
});