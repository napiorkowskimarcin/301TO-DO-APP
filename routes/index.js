const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    layout: "main",
  });
});

router.post("/", (req, res) => {
  try {
    const data = req.body;
    new Task(data).save();
    res.render("index-succes", {
      layout: "main",
      data,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500", { layout: "main" });
  }
});

router.get("/tasks", async (req, res, next) => {
  try {
    const Data = await Task.find().lean();
    console.log(Data);
    res.render("tasks", { layout: "main", Data });
  } catch (error) {
    console.error(error);
    res.render("error/500", { layout: "main" });
  }
});

module.exports = router;
