"use strict";
"use esversion:6";

const tc = require("../controller/timecard");

const express = require("express");
const router = express.Router();

router.get("/timecard", (req, res) => res.json(tc.one(req.query.timecard_id)));

router.get("/timecards", (req, res) => res.json(tc.all(req.query.emp_id)));

router.put("/timecard", (req, res) =>
  res.json(
    tc.update(req.body.timecard_id, req.body.start_time, req.body.end_time)
  )
);

router.post("/timecard", (req, res) =>
  res.json(tc.insert(req.body.start_time, req.body.end_time, req.body.emp_id))
);

router.delete("/timecard", (req, res) =>
  res.json(tc.delete(req.query.timecard_id))
);

module.exports = router;
