var Country = require("../models/Country");
var State = require("../models/State");

// 6. list all states in an ascending order of their population
let listByPopulation = (req, res, next) => {
  State.find()
    .sort({ name: 1 })
    .exec((err, states) => {
      if (err) return next(err);
      res.status(200).json({ states });
    });
};
// 7. for a particular state, list all neighbouring states
let allNeighbouringStates = (req, res, next) => {
  var id = req.params.id;
  State.findById(id, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ neighbours: country.neighbouring_states });
  });
};
// 13. update/remove a state from any country

module.exports = { allNeighbouringStates, listByPopulation };
