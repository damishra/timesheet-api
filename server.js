"use strict";
"use esversion:6";

const datalayer = require("./companydata");
const express = require("express");
const app = express();
const port = 8080;

const bodyParser = require("body-parser");

const routes = [
  require("./routes/department"),
  require("./routes/employee"),
  require("./routes/timecard"),
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const root = "/CompanyServices";

routes.forEach((req) => app.use(root, req));

/**
 * Deletes the company being queried.
 */
app.delete(`${root}/company`, (req, res) => {
  try {
    const company = req.query.company;
    datalayer.deleteCompany(company)
      ? res.json({ success: `${company} was deleted.` })
      : res.json({ error: `${company} wasn't found.` });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

app.listen(port, console.log(`\nlistening on port: ${port}\n`));

module.exports = app;
