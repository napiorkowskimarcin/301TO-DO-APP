const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const Data = await Task.findById(req.params.id);
  console.log("This is a selected one: " + Data);
  return res.render("edit", { layout: "main", Data });
  //   if (!Data) {
  //     return res.render("error/404", { layout: "main" });
  //   }
});

module.exports = router;
