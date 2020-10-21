const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const Data = req.body;
    Data.type = "removed";
    console.log(req.params.id);
    await Task.remove({ _id: req.params.id });
    return res.render("success", { layout: "main", Data });
  } catch (error) {
    console.error(error);
    return res.render("error/500");
  }
});

module.exports = router;
