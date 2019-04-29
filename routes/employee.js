'use strict';
'use esversion:6';

const emp = require('../controller/employee');

const express = require('express');
const router = express.Router();

router.get('/employee', (req, res) => res.json(emp.one(req.query.emp_id)));

router.get('/employees', (req, res) => res.json(emp.all(req.query.company)));

router.put('/employee', (req, res) =>
  res.json(
    emp.update(
      req.body.emp_id,
      req.body.emp_name,
      req.body.hire_date,
      req.body.job,
      req.body.salary,
      req.body.dept_id,
      req.body.mng_id
    )
  )
);

router.post('/employee', (req, res) =>
  res.json(
    emp.insert(
      req.body.emp_name,
      req.body.hire_date,
      req.body.job,
      req.body.salary,
      req.body.dept_id,
      req.body.mng_id
    )
  )
);

router.delete('/employee', (req, res) =>
  res.json(emp.delete(req.query.emp_id))
);

module.exports = router;
