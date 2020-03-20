import express from "express";

// graphQL
import graphqlHTTP from "express-graphql";
import { schema } from "./data/schema";

const app = express();

app.get("/", (req, res) => {
    res.send("Up and running");
});

app.use(
    "/graphql",
    graphqlHTTP({
        // set the schema to use in this url
        schema,
        // utilize graphical
        graphiql: true
    })
);

app.listen(8000, () => console.log("Server listening on port 8000"));
