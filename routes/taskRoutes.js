const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  accessTask,
  createTask,
  editTask,
  removeTask,
} = require("../controllers/taskControllers");

const router = express.Router();

router.route("/:userId").get(protect, accessTask);
router.route("/create").post(protect, createTask);
router.route("/:id").put(protect, editTask);
router.route("/:id").delete(protect, removeTask);

module.exports = router;
