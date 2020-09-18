"use strict";
"use esversion:6";

const dept = require("../controller/department");

const express = require("express");
const router = express.Router();

router.get("/department", (req, res) =>
  res.json(dept.one(req.query.company, req.query.dept_id))
);

router.get("/departments", (req, res) => res.json(dept.all(req.query.company)));

router.put("/department", (req, res) =>
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

router.post("/department", (req, res) =>
  res.json(
    dept.insert(
      req.body.company,
      req.body.dept_name,
      req.body.dept_no,
      req.body.location
    )
  )
);

router.delete("/department", (req, res) =>
  res.json(dept.delete(req.query.company, req.query.dept_id))
);

module.exports = router;
