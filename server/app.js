const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  `mongodb+srv://gqlDbUser:<PASSWORD>@cluster0.hegbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);
mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server running... Listening on port 4000");
});
