const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

//find the task by id and log its data to html form

router.get("/:id", async (req, res) => {
  const Data = await Task.findById(req.params.id);
  console.log("This is a selected one: " + Data);
  return res.render("edit", { layout: "main", Data });
  //   if (!Data) {
  //     return res.render("error/404", { layout: "main" });
  //   }
});

//Update the data with method-override

router.put("/:id", async (req, res) => {
  const Data = req.body;
  console.log(Data);
  await Task.findByIdAndUpdate(req.params.id, req.body);
  return res.render("success", { layout: "main", Data });
});

module.exports = router;
