const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    layout: "main",
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const taskData = new Task(req.body);
  taskData.save();
  res.render("index", {
    layout: "main",
  });
});

module.exports = router;
