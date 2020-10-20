const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const Data = await Task.find().lean();
    //console.log(Data);
    res.render("tasks", { layout: "main", Data });
  } catch (error) {
    console.error(error);
    res.render("error/500", { layout: "main" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const data = await Task.findByIdAndDelete(req.params.id);
  res.redirect("tasks", { layout: "main" });
});

module.exports = router;
