const datalayer = require('companydata');
const Department = require('companydata').Department;
const Employee = require('companydata').Employee;
const Timecard = require('companydata').Timecard;

const express = require('express');
const app = express();
const port = 8080;

const root = '/CompanyServices';

/**
 * Deletes the company being queried.
 */
app.delete(`${root}/company`, (req, res) => {
  try {
    let company = req.query.company;
    datalayer.deleteCompany(company)
      ? res.json({ success: `${company} was deleted.` })
      : res.json({ error: `${company} wasn't found.` });
  } catch (err) {
    res.json({
      error: err
    });
  }
});

/**
 * Gets the department based on the company name and department id.
 */
app.get(`${root}/department`, (req, res) => {
  try {
    let company = req.query.company;
    let department = req.query.dep_id;
    let result = datalayer.getDepartment(company, department)
      ? res.json({ success: result })
      : res.json({ error: `Dpt. ${department} not in ${company}.` });
  } catch (err) {
    res.json({ error: err });
  }
});

/**
 * Gets all the department in the specified company
 */
app.get(`${root}/departments`, (res, req) => {
  try {
    let company = req.query.company;
    let result = datalayer.getAllDepartment(company)
      ? res.json(result)
      : res.json({ error: `No dpt. found in ${company}` });
  } catch (err) {
    res.json({ error: err });
  }
});

app.listen(port, () => console.log(`MishraDP3 on ${port}!`));
