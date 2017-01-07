/**
 * Created by Hamza Fetuga on 1/5/2017.
 */
var app = require('../../app');
var express = require('express');
var models = require('../../data/models');
var status = require('http-status');
var bodyparser = require('body-parser');
var Record = models().Record;
var App = models().App;
var moment = require('moment');

//var r = express.router(bodyparser.json());
var router = express.Router();
router.use(bodyparser.json());

module.exports = function () {

    var appFieldsToShow = {name : 1, description : 1};

    // add a new app
    router.post('/app', function (req, res) {

        //req.setTimeout(5000);
        var appBody = req.body;
        console.log(appBody);
        var app = new App(appBody);
        app.save(function (err) {

            if (err){
                return handleError(err, res, status.BAD_GATEWAY);
            }
            else{
                return res.status(status.OK)
                        .json({ message : "App successfully added" });
            }

        });
    });

    // get all apps
    router.get('/app', function (req, res) {

        App.find({}, appFieldsToShow, function (err, apps) {

            if (err){
                handleError(err, res, status.BAD_REQUEST);
            }
            else {
                return res.status(status.OK)
                    .json({ message : "success",
                        data : apps
                    });
            }

        })

    });

    // add an app record
    router.post('/record/:appName', function (req, res) {

        var recordBody = req.body;
        var appName = req.params.appName;
        //console.log(appName);
        App.findOne({'name' : appName}, function (err, app) {

            if (err){
                return handleError(err, res, status.BAD_REQUEST);
            }
            else {
                //console.log(recordBody);
                var record = new Record();
                record.appId = app._id;
                record.notes = recordBody.notes;
                console.log(record.notes);
                record.url = recordBody.url;
                record.version = recordBody.version;

                record.save(function (err) {
                    if (err) {
                        return res.status(status.BAD_REQUEST)
                            .json({ error : err.message});
                    }
                    else {
                        return res.status(status.OK)
                            .json({ message : "Record successfully added" });
                    }
                });
            }
        });

    });

    // get records for an app
    router.get('/record/:appName', function (req, res) {
        var appName = req.params.appName;

        App.findOne({'name': appName}, function (err, app) {

            console.log(app);

            if (!app) {
                // var error = {};
                // error.status = 404;
                // error.stack = "";
                return res.status(404).json({message:"App not found"});      // HTTP status 404: NotFound
            }
            else {
                //console.log(app);
                Record.find({'appId' : app._id}, function (err, records) {
                    if (err) {
                        return res.status(status.BAD_REQUEST)
                            .json({error: err.message});
                    }
                    else {
                        return res.status(status.OK)
                            .json({data: records, moment: moment});
                    }
                });
            }

        });
    });

    //todo add get app records (paginated) [limit, page]
    return router;

};

var handleError = function (err, res, status) {

    return res.status(status)
        .json({ error : err.message});

};

module.exports.handleError = handleError;


