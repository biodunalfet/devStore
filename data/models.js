var mongoose = require('mongoose');
var appSchema = require('./app');
var recordSchema = require('./record');
var dotenv = require('dotenv');

module.exports = function () {
    // var connection = mongoose.createConnection('mongodb://localhost:27017/devstore');
    var connection = mongoose.createConnection('mongodb://' + process.env.DEVSTORE_DB_USER + ':' +
        process.env.DEVSTORE_DB_PASS + '@ds157288.mlab.com:57288/devstore');



    var Record = connection.model('Record',
        recordSchema,
        'records');

    var App = connection.model('App',
        appSchema,
        'apps');

    return {
        Record: Record,
        App: App
    };

};