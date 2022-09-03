var express = require("express");
const {
  allNeighbouringStates,
  listByPopulation,
} = require("../../controller/stateController");
var router = express.Router();

router.get("/neighbouring_states", allNeighbouringStates);
router.get("/listByPopulation", listByPopulation);

module.exports = router;
