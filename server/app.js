// https://www.youtube.com/watch?v=ed8SzALpx1Q - 1:58
require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  `mongodb+srv://gqlDbUser:${process.env.DBPASSWORD}@cluster0.hegbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Error connecting to the database!");
    }
  }
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
