const express = require("express");

const app = express();

const {
  checkEntries,
  generateId,
  morganLogger,
} = require("./resources/functs/main");

const port = process.env.PORT || 3001
let persons = require("./resources/data/persons.json");

app.use(express.json());
app.use(morganLogger);
app.use(express.static('dist'))

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/info", (req, res) => {
  const perNumber = persons.length;
  const theTime = Date();

  const template = (persN, time) => {
    return `
    <p>Phonebook has info for ${persN} people</p>
    <p>${time}</p>
    `;
  };
  res.send(template(perNumber, theTime));
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  const ErrResult = checkEntries(name, number, persons);
  if (ErrResult) {
    return res.status(400).json(ErrResult);
  }
  const id = generateId(220, 104500);
  persons = persons.concat({ id, name, number });
  res.status(200).json({ id, name, number });
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = persons.find((person) => person.id === id);
  if (!result) {
    return res.status(404).end();
  }
  res.status(200).json(result);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})