var mongoose = require('mongoose');
var appSchema = require('./app');
var recordSchema = require('./record');


module.exports = function () {
    var connection = mongoose.createConnection('mongodb://localhost:27017/devstore');

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