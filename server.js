const datalayer = require('companydata');
const Department = require('companydata').Department;
const Employee = require('companydata').Employee;
const Timecard = require('companydata').Timecard;

const express = require('express');
const app = express();
const port = 8080;

const root = '/CompanyServices';

app.get(`${root}/company`, (req, res) => {
    try {
        let company = req.query.company;
        datalayer.deleteCompany(company) ?
            res.send({
                success: `${company} was deleted.`
            }) :
            res.send({
                error: `${company} wasn't found.`
            });
    } catch (err) {
        res.send({
            error: err
        });
    }
});

app.listen(port, () => console.log(`MishraDP3 on ${port}!`));