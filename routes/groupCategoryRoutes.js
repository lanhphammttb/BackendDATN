const express = require("express");
const router = express.Router();
const groupCategoryController = require("../controllers/groupCategoryController");

router.get("/", groupCategoryController.getGroupCategories);
router.get("/:id", groupCategoryController.getGroupCategoryById);
router.post("/", groupCategoryController.createGroupCategory);
router.put("/:id", groupCategoryController.updateGroupCategory);
router.delete("/:id", groupCategoryController.deleteGroupCategory);

module.exports = router;
