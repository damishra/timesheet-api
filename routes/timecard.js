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

      tc.start_time = moment(start, 'YYYY-MM-DD hh:mm:ss').format(
        'YYYY-MM-DD hh:mm:ss'
      );
      tc.end_time = moment(end, 'YYYY-MM-DD hh:mm:ss').format(
        'YYYY-MM-DD hh:mm:ss'
      );
      tc.emp_id = emp;
      datalayer.updateTimecard(tc)
        ? (result = { success: datalayer.getTimecard(id) })
        : (result = { error: `Timecard ${id} doesn't exist.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  insert: (name, num, hire, job, sal, dept, mng) => {
    try {
      let result;
      num = `${company}-e-${num}`;
      hire =
        moment(hire, 'YYYY-MM-DD').format('YYYY-MM-DD') ||
        moment().format('YYYY-MM-DD');
      const emp = new Employee(name, num, hire, job, sal, dept, mng);
      datalayer.insertEmployee(emp)
        ? (result = { success: datalayer.getEmployeeByNo(num) })
        : (result = { error: `Emp. ${id} not created.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  delete: id => {
    try {
      let result;
      datalayer.deleteEmployee(id)
        ? (result = { success: `Emp. ${id} has been deleted.` })
        : (result = { error: `Emp. ${id} couldn't be deleted.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  }
};
