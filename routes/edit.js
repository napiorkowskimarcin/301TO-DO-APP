const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

//find the task by id and log its data to html form

router.get("/:id", async (req, res) => {
  try {
    const Data = await Task.findById(req.params.id);
    console.log("This is a selected one: " + Data);
    return res.render("edit", { layout: "main", Data });
  } catch (error) {
    console.error(error);
    return res.render("error/500");
  }
});

//Update the data with method-override

router.put("/:id", async (req, res) => {
  try {
    const Data = req.body;
    Data.type = "updated";
    Data.render = 1;
    console.log(Data);
    await Task.findByIdAndUpdate(req.params.id, req.body);
    return res.render("success", { layout: "main", Data });
  } catch (error) {
    console.error(error);
    return res.render("error/500");
  }
});

module.exports = router;
