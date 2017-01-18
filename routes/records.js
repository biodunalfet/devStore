/**
 * Created by Hamza Fetuga on 1/6/2017.
 */
var superagent = require('superagent');
var express = require('express');
var router = express.Router();
//var URL_ROOT = 'https://arcane-fortress-56188.herokuapp.com';
var api = require('../api/v1/api');
var http_status = require('http-status');
var constants = require('../data/constants');
var URL_ROOT = constants().urls.useUrl;

router.get('/:appName', function (req, res, next) {

    var appName = req.params.appName;
    var limit = req.query.limit;
    var page = req.query.page;

    if (limit == null){
        limit = 10;
    }

    if (page == null){
        page = 1;
    }
    var url = URL_ROOT + '/api/v1/record/' + appName + "?page=" + page + "&limit=" + limit + "&count=1";
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
            //console.log(result);
            var resultObj = JSON.parse(result.text);
            res.render('records',
                {
                    appName : appName,
                    data : resultObj.data,
                    count : resultObj.count,
                    page : page,
                    url : URL_ROOT
                });
        }
        
    });

});

module.exports = router;
