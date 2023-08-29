const morgan = require("morgan");

const checkEntries = (name, number, persons) => {
  if (!name) {
    return {
      error: "Please provide the name",
    };
  }

  if (!number) {
    return {
      error: "Please provide the number",
    };
  }

  const search = persons.find((person) => person.name === name);
  if (search) {
    return {
      error: "Person already exists",
    };
  }

  return null;
};

const generateId = (start, end) => {
  return Math.floor(Math.random() * end) + start;
};

const morganLogger = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    tokens.method(req, res) === "POST" ? JSON.stringify(req.body) : "",
  ].join(" ");
});

module.exports = { checkEntries, generateId, morganLogger };
