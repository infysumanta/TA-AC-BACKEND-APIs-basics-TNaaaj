var Country = require("../models/Country");
var State = require("../models/State");

// 1. create country where each country can have
//     name
//     states -> ObjectIds
//     continent
//     population
//     ethnicity(religions) -> String
//     neighbouring_countires -> ObjectIds of countires
//     area

let createCountry = (req, res, next) => {
  var data = req.body;
  data.ethnicity = data.ethnicity.trim().split(",");
  Country.create(data, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ country });
  });
};

// 2. List all countries in asc/desc order.

let getAllCountry = (req, res, next) => {
  let key = req.params.key;

  if (!key || key == "asc") {
    Country.find({})
      .sort({ name: 1 })
      .exec((err, countries) => {
        if (err) return next(err);
        res.status(200).json({ countries });
      });
  } else {
    Country.find({})
      .sort({ name: -1 })
      .exec((err, countries) => {
        if (err) return next(err);
        res.status(200).json({ countries });
      });
  }
};
// 3. update/delete a country
let updateCountry = (req, res, next) => {
  var id = req.params.id;
  var data = req.body;
  data.ethnicity = data.ethnicity.trim().split(",");
  data.neighbouring_countries = data.neighbouring_countries.trim().split(",");
  Country.findByIdAndUpdate(id, data, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ country });
  });
};

let deleteCountry = (req, res, next) => {
  Country.findByIdAndDelete(data, (err, country) => {
    if (err) return next(err);
    State.deleteMany({ country: id }, (err, states) => {
      if (err) return next(err);
      res.status(200).json({ country });
    });
  });
};

// 4. Add states for each countires which will have fields
//     name of state
//     country -> ObjectId of country
//     population
//     area
//     neighbouring_states -> State ObejctIds

let addState = (req, res, next) => {
  var data = req.body;
  var countryId = req.params.id;
  State.create(data, (err, state) => {
    if (err) return next(err);
    Country.findByIdAndUpdate(
      countryId,
      { $push: { states: state._id } },
      (err, country) => {
        res.status(200).json({ state });
      }
    );
  });
};

// 5. list all states for a country in ascending/descending order
let listStates = (req, res, next) => {
  let key = req.params.key;

  if (!key || key == "asc") {
    State.find({ country: req.params.id })
      .sort({ name: 1 })
      .exec((err, countries) => {
        if (err) return next(err);
        res.status(200).json({ countries });
      });
  } else {
    State.find({ country: req.params.id })
      .sort({ name: -1 })
      .exec((err, countries) => {
        if (err) return next(err);
        res.status(200).json({ countries });
      });
  }
};
// 8. for a particular country, list all neighbouring countires
let allNeighbouringCountries = (req, res, next) => {
  var id = req.params.id;
  Country.findById(id, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ neighbours: country.neighbouring_countries });
  });
};
// 9.list all religions present in entire country dataaset.
let allReligions = (req, res, next) => {
  var id = req.params.id;
  Country.findById(id).distinct(ethnicity, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ religions: country.ethnicity });
  });
};
// 10. list countries based on religions.
let countriesByReligion = (req, res, next) => {
  const { relgion } = req.body;
  Country.find({ ethnicity: { $in: ["religion"] } }, (err, countries) => {
    if (err) return next(err);
    res.status(200).json({ countries });
  });
};
// 11. list countries based on continent.
let countriesByContinent = (req, res, next) => {
  const { continent } = req.body;
  Country.find({ continent: continent }, (err, countries) => {
    if (err) return next(err);
    res.status(200).json({ countries });
  });
};
// 12. list countries based on population.
let countriesByPopulation = (req, res, next) => {
  const { minPopulation, maxPopulation } = req.body;
  Country.find(
    { population: { $gte: minPopulation, $lte: maxPopulation } },
    (err, countries) => {
      if (err) return next(err);
      res.status(200).json({ countries });
    }
  );
};

let addNeighbourCountry = (req, res, next) => {
  var countryId = req.params.id;
  var name = req.body.name;

  Country.findOne({ name }, (err, country) => {
    if (err) return next(err);
    Country.findByIdAndUpdate(
      countryId,
      { $push: { neighbouring_countries: country._id } },
      (err, updatedCountry) => {
        if (err) return next(err);
        res.status(200).json({ updatedCountry });
      }
    );
  });
};

module.exports = {
  createCountry,
  getAllCountry,
  updateCountry,
  deleteCountry,
  addState,
  allReligions,
  countriesByReligion,
  countriesByContinent,
  countriesByPopulation,
  allNeighbouringCountries,
  addNeighbourCountry,
  listStates,
};
