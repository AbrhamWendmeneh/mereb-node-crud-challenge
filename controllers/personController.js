const { validatePerson, createPerson } = require("../models/personModel");
const persons = require("../db/database");

const createPersonHandler = (req, res) => {
  try {
    const { id, ...personData } = req.body; // Destructuring id from req.body
    const { error } = validatePerson(personData);
    if (error) {
      res.status(400).json({ error });
    } else {
      const person = createPerson(
        personData.name,
        personData.age,
        personData.hobbies
      );
      persons.push(person);
      res.sendStatus(200);
    }
  } catch {
    res
      .status(500)
      .json({ error: "An error occurred while creating the person" });
  }
};

const getPersons = (req, res) => {
  try {
    if (persons.length > 0) {
      res.json(persons);
    } else {
      res.status(404).json({ error: "No persons found" });
    }
  } catch {
    res.status(500).json({ error: "An error occurred while fetching persons" });
  }
};

const getPersonByID = (req, res) => {
  try {
    let filteredPerson = persons.filter((p) => p.id == req.params.id);
    if (filteredPerson.length) {
      res.json(filteredPerson[0]);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the person" });
  }
};

const updatePerson = (req, res) => {
  try {
    let personIndex = persons.findIndex((p) => p.id === req.params.id);
    if (personIndex >= 0) {
      const { id, ...personData } = req.body;

      const { error } = validatePerson(personData);
      if (error) {
        res.status(400).json({ error });
      } else {
        const person = createPerson(
          personData.name,
          personData.age,
          personData.hobbies
        );
        person.id = persons[personIndex].id;
        persons[personIndex] = person;
        res.sendStatus(200);
      }
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch {
    res
      .status(500)
      .json({ error: "An error occurred while updating the person" });
  }
};

const deletePerson = (req, res) => {
  try {
    let personIndex = persons.findIndex((p) => p.id === req.params.id);
    if (personIndex >= 0) {
      persons.splice(personIndex, 1);
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the person" });
  }
};

module.exports = {
  getPersons,
  getPersonByID,
  createPersonHandler,
  updatePerson,
  deletePerson,
};
