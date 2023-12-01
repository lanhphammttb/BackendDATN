const express = require("express");
const router = express.Router();
const expectedCostController = require("../controllers/expectedCostController");

router.get("/", expectedCostController.getExpectedCosts);
router.get("/:id", expectedCostController.getExpectedCostById);
router.post("/", expectedCostController.createExpectedCost);
router.put("/:id", expectedCostController.updateExpectedCost);
router.delete("/:id", expectedCostController.deleteExpectedCost);
router.get("/search", expectedCostController.getExpectedCostsByKeyword);

module.exports = router;
