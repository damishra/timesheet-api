"use strict";
"use esversion:6";

const datalayer = require("../companydata");
const Employee = require("../companydata").Employee;

const moment = require("moment");

module.exports = {
  one: (id) => {
    try {
      let result;
      datalayer.getEmployee(id)
        ? (result = { success: datalayer.getEmployee(id) })
        : (result = { error: `Emp. ${id} not found.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  all: (company) => {
    try {
      let result;
      datalayer.getAllEmployee(company).length
        ? (result = datalayer.getAllEmployee(company))
        : (result = { error: `No emp. found.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  update: (id, name, num, hire, job, sal, dept, mng) => {
    try {
      let result;
      if (moment(hire, "YYYY-MM-DD") <= moment()) {
        const emp = datalayer.getEmployee(id);

        if (datalayer.getDepartment(dept)) {
          emp.emp_name = name;
          emp.emp_num = `dxm2269-e-${num}`;
          emp.hire_date =
            moment(hire, "YYYY-MM-DD").format("YYYY-MM-DD") ||
            emp.hire_date ||
            moment().format("YYYY-MM-DD");
          emp.job = job;
          emp.salary = parseFloat(sal);
          emp.dept_id = dept;
          emp.mng_id = mng;
          datalayer.updateEmployee(emp)
            ? (result = { success: datalayer.getEmployee(id) })
            : (result = { error: `Emp. ${id} doesn't exist.` });
        } else {
          result = {
            error: `Dept. ${dept} doesn't exist. A foreign key constraint fails.`,
          };
        }
      } else {
        result = { error: "Invalid hire date provided." };
      }
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  insert: (name, num, hire, job, sal, dept, mng) => {
    let result;
    try {
      if (moment(hire, "YYYY-MM-DD") <= moment()) {
        if (datalayer.getDepartment(dept)) {
          num = `dxm2269-e-${num}`;
          hire = moment(hire, "YYYY-MM-DD") || moment();
          const emp = new Employee(
            name,
            num,
            hire,
            job,
            parseFloat(sal),
            dept,
            mng
          );
          datalayer.insertEmployee(emp)
            ? (result = { success: emp })
            : (result = { error: `Emp. ${id} not created.` });
        } else {
          result = {
            error: `Dept. ${dept} doesn't exist. A foreign key constraint fails.`,
          };
        }
      } else {
        result = { error: "Invalid hire date provided." };
      }

      return result;
    } catch (err) {
      return { error: err };
    }
  },
  delete: (id) => {
    try {
      let result;
      datalayer.deleteEmployee(id)
        ? (result = { success: `Emp. ${id} has been deleted.` })
        : (result = { error: `Emp. ${id} doesn't exist.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
};
