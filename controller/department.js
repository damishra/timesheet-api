"use strict";
"use esversion:6";

const datalayer = require("../companydata");
const Department = require("../companydata").Department;

module.exports = {
  /**
   * Get one department
   */
  one: (company, department) => {
    try {
      let result;
      datalayer.getDepartment(company, department)
        ? (result = { success: datalayer.getDepartment(company, department) })
        : (result = { error: `Dpt. ${department} not in ${company}.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  /**
   * Get all the departments under company
   */
  all: (company) => {
    try {
      let result;
      datalayer.getAllDepartment(company).length
        ? (result = datalayer.getAllDepartment(company))
        : (result = { error: `No dpt. found in ${company}` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  /**
   * Update existing department
   */
  update: (id, company, name, num, loc) => {
    try {
      let result;
      const dept = datalayer.getDepartment(company, id);

      dept.dept_name = name;
      dept.dept_no = `${company}-d-${num}`;
      dept.location = loc;

      datalayer.updateDepartment(dept)
        ? (result = { success: datalayer.getDepartment(company, id) })
        : (result = { error: `Dept. ${id} doesn't exist in ${company}.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  /**
   * Insert new department under company
   */
  insert: (company, name, num, loc) => {
    try {
      let result;
      num = `${company}-d-${num}`;
      if (!datalayer.getDepartmentByNo(num)) {
        const dept = new Department(company, name, num, loc);
        datalayer.insertDepartment(dept)
          ? (result = { success: datalayer.getDepartmentByNo(company, num) })
          : (result = { error: `Dept. ${id} not created in ${company}.` });
      } else {
        result = { error: "Department already exists." };
      }
      return result;
    } catch (err) {
      return { error: err };
    }
  },
  /**
   * Delete existing department
   */
  delete: (company, id) => {
    try {
      let result;
      datalayer.deleteDepartment(company, id)
        ? (result = { success: `Dpt. ${id} has been deleted from ${company}.` })
        : (result = { error: `Dpt. ${id} couldn't be deleted.` });
      return result;
    } catch (err) {
      return { error: err };
    }
  },
};
