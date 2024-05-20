import express from "express";

const app = express();

app.use(express.static("public"));

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port:`, PORT));

import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => "world",
            },
        },
    }),
});

import { createHandler } from "graphql-http/lib/use/express";
app.all("/graphql", createHandler({ schema }));
