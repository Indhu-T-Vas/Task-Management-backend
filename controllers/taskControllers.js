const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Task = require("../models/taskModel");
const { default: mongoose } = require("mongoose");

const accessTask = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    const userExist = await User.findById(userId);
    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User not exists" });
    }

    const tasks = await Task.find({ user: userId });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const createTask = asyncHandler(async (req, res) => {
  try {
    const { user, status, title, description } = req.body;
    const userExist = await User.findById(user);
    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User not exists" });
    }

    const tasks = await Task.create({ user, status, title, description });
    res.status(200).json({ data: tasks, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const editTask = asyncHandler(async (req, res) => {
  try {
    const taskModified = await Task.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: req.body.status,
        title: req.body.title,
        description: req.body.description,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ data: taskModified, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

const removeTask = asyncHandler(async (req, res) => {
  try {
    const deletedTask = await Task.deleteOne({ _id: req.params.id });
    return res
      .status(201)
      .json({ message: "Task Deleted Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = { accessTask, createTask, editTask, removeTask };
