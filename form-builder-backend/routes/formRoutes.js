const express = require("express");
const {
  createForm,
  deleteForm,
  getForm,
  getForms,
  updateForm,
} = require("../controllers/formController.js");
const router = express.Router();

router.route("/").get(getForms).post(createForm);
router.route("/:formId").get(getForm).patch(updateForm).delete(deleteForm);

module.exports = router;
