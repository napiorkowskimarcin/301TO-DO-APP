const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config/config");
const exphbs = require("express-handlebars");
//not able to acces Data.taskName etc in edit
const Handlebars = require("handlebars");
const methodOverride = require("method-override");

//set a port
const PORT = process.env.PORT || 3000;
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//load mongoose
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
//set a mongoose connection - catch errors.
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

//start app
const app = express();

//method override for put and delete
app.use(methodOverride("_method"));

//allow bodyParser to recognize a body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// due toproblems with handlebars - better do not use it in case client is able to create bhs templates.
//leave this:
// app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
// app.set("view engine", ".hbs");

//load handlebars and set .handlebars to .hbs
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", ".hbs");

//login data
app.use(morgan("dev"));

//Routes
app.use("/", require("./routes/index"));
app.use("/tasks", require("./routes/tasks"));
app.use("/edit", require("./routes/edit"));
app.use("/delete", require("./routes/delete"));

//start listening
app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));
