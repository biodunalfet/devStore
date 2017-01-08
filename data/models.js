var mongoose = require('mongoose');
var appSchema = require('./app');
var recordSchema = require('./record');
var config = require('../config');

module.exports = function () {
    // var connection = mongoose.createConnection('mongodb://localhost:27017/devstore');
    var connection = mongoose.createConnection('mongodb://' + config.DB_USER + ':' +
        config.DB_PASSWORD + '@ds157288.mlab.com:57288/devstore');

    console.log(config.DB_PASSWORD);
    console.log(config.DB_USER);

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