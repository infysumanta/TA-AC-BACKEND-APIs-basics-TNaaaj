var express = require("express");
const {
  createCountry,
  getAllCountry,
  updateCountry,
  deleteCountry,
  addState,
  listStates,
  allReligions,
  countriesByReligion,
  countriesByContinent,
  countriesByPopulation,
  allNeighbouringCountries,
  addNeighbourCountry,
} = require("../../controller/countryController");
var router = express.Router();

// 1. create country where each country can have
//     name
//     states -> ObjectIds
//     continent
//     population
//     ethnicity(religions) -> String
//     neighbouring_countires -> ObjectIds of countires
//     area
router.post("/", createCountry);

// 2. List all countries in asc/desc order.
router.get("/:key?", getAllCountry);

// 3. update/delete a country
// Update a country
router.put("/:id", updateCountry);

// Delete a country
router.delete("/:id", deleteCountry);

// Add neighbouring country
router.put("/addNeighbourCountry/:id", addNeighbourCountry);

// 5. list all states for a country in ascending/descending order
router.get("/:id/listStates/key?", listStates);

// 8. for a particular country, list all neighbouring countires
router.get("/allNeighbouringCountries/:id", allNeighbouringCountries);

// 9.list all religions present in entire country dataaset.
router.get("allReligions/:id", allReligions);

// 10. list countries based on religions.
router.get("/filter/religion", countriesByReligion);

// 11. list countries based on continent.
router.get("/filter/continent", countriesByContinent);

// 12. list countries based on population.
router.get("/filter/population", countriesByPopulation);

// 4. Add states for each countires which will have fields
//     name of state
//     country -> ObjectId of country
//     population
//     area
//     neighbouring_states -> State ObejctIds

router.post("/:id", addState);

module.exports = router;
