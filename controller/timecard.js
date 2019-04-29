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
      datalayer.getAllTimecard(employee).length
        ? (result = datalayer.getAllTimecard(employee))
        : (result = { error: `No timecard found.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  update: (id, start, end) => {
    try {
      let result;
      const tc = datalayer.getTimecard(id);

      tc.start_time =
        moment(start, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') ||
        tc.start_time ||
        moment().format('YYYY-MM-DD HH:mm:ss');
      tc.end_time =
        moment(end, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') ||
        tc.end_time ||
        moment().format('YYYY-MM-DD HH:mm:ss');
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
      if (datalayer.getEmployee(emp)) {
        start =
          moment(start, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') ||
          moment().format('YYYY-MM-DD HH:mm:ss');
        end =
          moment(end, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') ||
          moment().format('YYYY-MM-DD HH:mm:ss');
        const tc = new Timecard(start, end, emp);
        datalayer.insertTimecard(tc)
          ? (result = { success: tc })
          : (result = { error: `Timecard not created.` });
      } else {
        result = {
          error: `Emp. ${emp} doesn't exist. A foreign key constraint fails.`
        };
      }
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
