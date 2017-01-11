/**
 * Created by Hamza Fetuga on 1/6/2017.
 */
var superagent = require('superagent');
var express = require('express');
var router = express.Router();
var URL_ROOT = 'https://arcane-fortress-56188.herokuapp.com';
//var URL_ROOT = 'http://localhost:3000';
var api = require('../api/v1/api');
var http_status = require('http-status');

router.get('/:appName', function (req, res, next) {

    var appName = req.params.appName;
    var url = URL_ROOT + '/api/v1/record/' + appName;
    console.log(url);
    superagent.get(url, function (error, result) {
       
        if (error){
            //console.log(error);
            //res.sendStatus(http_status.NOT_FOUND);
            var error = {};
            error.status = http_status.NOT_FOUND;
            error.stack = "Check the url";
            res.render('error', {message: "App not found", error: error});
            //res.send();
        }
        else {
            console.log(result);
            res.render('records',
                {
                    appName : appName,
                    data : JSON.parse(result.text).data
                });
        }
        
    });

});

module.exports = router;
