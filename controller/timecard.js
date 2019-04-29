'use strict';
'use esversion:6';

const datalayer = require('../companydata');
const Timecard = require('../companydata').Timecard;

const moment = require('moment');

module.exports = {
  one: id => {
    try {
      let result;
      datalayer.getTimecard(id)
        ? (result = { success: datalayer.getTimecard(id) })
        : (result = { error: `Timecard ${id} not found.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  all: employee => {
    try {
      let result;
      datalayer.getAllTimecards(employee)
        ? (result = datalayer.getAllTImecards(employee))
        : (result = { error: `No timecard found.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  update: (id, start, end, emp) => {
    try {
      let result;
      const tc = datalayer.getTimecard(id);

      tc.start_time =
        moment(start, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') ||
        tc.start_time ||
        moment().format('YYYY-MM-DD hh:mm:ss');
      tc.end_time =
        moment(end, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') ||
        tc.end_time ||
        moment().format('YYYY-MM-DD hh:mm:ss');
      tc.emp_id = emp;
      datalayer.updateTimecard(tc)
        ? (result = { success: datalayer.getTimecard(id) })
        : (result = { error: `Timecard ${id} doesn't exist.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  insert: (start, end, emp) => {
    try {
      let result;
      start =
        moment(start, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') ||
        moment().format('YYYY-MM-DD hh:mm:ss');
      end =
        moment(end, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') ||
        moment().format('YYYY-MM-DD hh:mm:ss');
      const tc = new Timecard(start, end, emp);
      datalayer.insertTimecard(tc)
        ? (result = { success: tc })
        : (result = { error: `Timecard not created.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  delete: id => {
    try {
      let result;
      datalayer.deleteTimecard(id)
        ? (result = { success: `Timecard ${id} has been deleted.` })
        : (result = { error: `Timecard ${id} couldn't be deleted.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  }
};
