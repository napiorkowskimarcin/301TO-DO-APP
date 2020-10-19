const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: [true, "Task name is required,please"],
  },
  taskAuthor: {
    type: String,
    required: [true, "Author is required, please"],
  },
  taskBody: {
    type: String,
    required: [true, "Body cannot be empty, please"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
