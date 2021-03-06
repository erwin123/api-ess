const model = require('../models/index');
var express = require('express');
var router = express.Router();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Sequelize = require('sequelize');
const moment = require('moment');
const Op = require('Sequelize').Op;

router.get('/', function (req, res, next) {
    model.EmployeeAbsent.findAll({}).then(result => {
        res.json(result);
    });
});
router.get('/last', function (req, res, next) {
    let absenType = req.query.type;
    let empId = req.query.empid;
    model.EmployeeAbsent.max('Id', { where: { AbsentType: absenType, EmployeeID: empId } }).then(result => {
        if (result) {
            model.EmployeeAbsent.findAll({ where: { Id: result } }).then(maxAbsen => {
                res.json(maxAbsen);
            })
        } else {
            res.json([]);
        }
    });
});
router.post('/history', function (req, res, next) {
    model.sequelize.query("EXEC up_getHistoryAbsentLimit :Limit,:DateEnd,:EmployeeID",
        { replacements: req.body, type: Sequelize.QueryTypes.SELECT }).then(lastHistory => {
            if (lastHistory.length > 0) {
                res.json(lastHistory);
            }
        })

    // model.uv_EmployeeAbsentHistory.findAll({
    //     where: {
    //         CiEmployeeID: empId,
    //         ValueDate: {
    //             [Op.lte]: moment().format('YYYY-MM-DD')
    //         }
    //     }, limit: 8,
    //     order: [['CiID', 'DESC']]
    // }).then(last8 => {
    //     res.json(last8);
    // })
});
router.post('/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.EmployeeAbsent.findAll({ where: req.body }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    model.EmployeeAbsent.create(req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        // handle error;
        res.json(err);
    });
});

router.put('/', function (req, res, next) {
    model.EmployeeAbsent.update(req.body,
        { where: { Id: req.body.Id } }
    ).then((result) => {
        res.json(result);
    })
});

router.post('/upload', function (req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    const uuidv1 = require('uuid/v1');
    if (req.files.image) {
        let myfile = req.files.image;
        let ftype = myfile.mimetype.split('/')[1];
        let storage = config.folderImage;
        myfile.name = uuidv1() + "." + ftype;

        myfile.mv(storage + myfile.name, function (err) {
            if (err)
                return res.status(500).send(err);
            res.status(200).send({ "filename": myfile.name });
        });
    }
});

module.exports = router;