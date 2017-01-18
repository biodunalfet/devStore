var mongoose = require('mongoose');
var appSchema = require('./app');
var recordSchema = require('./record');
var dotenv = require('dotenv');
var constants = require('../data/constants');

module.exports = function () {


    var connectionString = constants().connectionStrings.useConnectionString;
    var connection = mongoose.createConnection(connectionString);
    
    console.log(connectionString);

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