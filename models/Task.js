const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: [true, "Task name is required,please"],
  },
  taskAuthor: {
    type: String,
    default: "Marcin",
    enum: ["Marcin", "Oktawia", "Oliwia", "Michal"],
  },
  taskBody: {
    type: String,
    required: [true, "Body cannot be empty, please"],
  },
  status: {
    type: String,
    default: "todo!",
    enum: ["todo!", "ready"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
