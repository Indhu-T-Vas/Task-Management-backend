const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    status: { type: String, required: true, default: "todo" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
