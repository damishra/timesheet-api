const datalayer = require('companydata');
const Department = require('companydata').Department;
const Employee = require('companydata').Employee;
const Timecard = require('companydata').Timecard;

const express = require('express');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const root = '/CompanyServices';

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
      error: err
    });
  }
});

/**
 * Gets the department based on the company name and department id.
 */
app.get(`${root}/department`, (req, res) => {
  try {
    const company = req.query.company,
      department = req.query.dept_id;
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
app.get(`${root}/departments`, (req, res) => {
  try {
    const company = req.query.company;
    console.log(company);
    datalayer.getAllDepartment(company)
      ? res.json(datalayer.getAllDepartment(company))
      : res.json({ error: `No dpt. found in ${company}` });
  } catch (err) {
    res.json({ error: err });
  }
});

/**
 * Updates the department based on new info.
 */
app.put(`${root}/department`, (req, res) => {
  try {
    const company = req.body.company,
      id = req.body.dept_id,
      name = req.body.dept_name,
      num = company + req.body.dept_no,
      loc = req.body.location,
      dept = datalayer.getDepartmentByNo(company, num);

    dept.dept_name = name;
    dept.location = loc;

    datalayer.updateDepartment(dept)
      ? res.json({ success: datalayer.getDepartmentByNo(company, num) })
      : res.json({ error: `Dept. ${id} doesn't exist in ${company}.` });
  } catch (err) {
    res.json({ error: err });
  }
});

/**
 * Adds new department to your company
 */
app.post(`${root}/department`, (req, res) => {
  try {
    const company = req.body.company,
      name = req.body.dept_name,
      num = company + req.body.dept_no,
      loc = req.body.location,
      dept = new Department(company, name, num, loc);
    datalayer.insertDepartment(dept)
      ? res.json({ success: datalayer.getDepartmentByNo(company, num) })
      : res.json({ error: `Dept. ${id} not created in ${company}.` });
  } catch (err) {
    res.json({ error: err });
  }
});

app.listen(port, () => console.log(`MishraDP3 on ${port}!`));
