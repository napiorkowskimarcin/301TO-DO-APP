const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config");
const exphbs = require("express-handlebars");

const PORT = 3000 || process.env.PORT;

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

//start app
const app = express();

// const {
//   allowInsecurePrototypeAccess,
// } = require("@handlebars/allow-prototype->access");

//allow bodyParser to recognize a body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//login data
app.use(morgan("dev"));

//Routes
app.use("/", require("./routes/index"));

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));
