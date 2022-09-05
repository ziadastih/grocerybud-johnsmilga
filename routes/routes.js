const express = require("express");
const router = express.Router();
const {
  getList,
  createItem,
  getOneItem,
  updateItem,
  deleteItem,
} = require("../controllers/controllers");

router.route("/").get(getList);
router.route("/").post(createItem);
router.route("/:id").get(getOneItem);
router.route("/:id").patch(updateItem);
router.route("/:id").delete(deleteItem);

module.exports = router;
