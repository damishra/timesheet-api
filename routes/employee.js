'use strict';
'use esversion:6';

const emp = require('../controller/employee');

const express = require('express');
const router = express.Router();

router.get('/employee', (req, res) => res.json(emp.one(req.query.emp_id)));

router.get('/employees', (req, res) => res.json(emp.all(req.query.company)));

router.put('/employee', (req, res) =>
  res.json(
    dept.update(
      req.body.dept_id,
      req.body.company,
      req.body.dept_name,
      req.body.dept_no,
      req.body.location
    )
  )
);

router.post('/employee', (req, res) =>
  res.json(
    dept.insert(
      req.body.company,
      req.body.dept_name,
      req.body.dept_no,
      req.body.location
    )
  )
);

router.delete('/employee', (req, res) =>
  res.json(dept.delete(req.query.company, req.query.dept_id))
);

module.exports = router;
