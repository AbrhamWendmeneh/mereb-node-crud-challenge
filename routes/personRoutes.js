// routes/personRoutes.js
const express = require("express");
const router = express.Router();
const {
  getPersons,
  getPersonByID,
  createPersonHandler,
  updatePerson,
  deletePerson,
} = require("../controllers/personController");

router.get("/", getPersons);
router.get("/:id", getPersonByID);
router.post("/", createPersonHandler);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;
