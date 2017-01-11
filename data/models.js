var mongoose = require('mongoose');
var appSchema = require('./app');
var recordSchema = require('./record');
var dotenv = require('dotenv');

module.exports = function () {

    var username = process.env.DEVSTORE_DB_USER;
    var password = process.env.DEVSTORE_DB_PASS;

    var connectionString = 'mongodb://' + username + ':' + password + '@ds157288.mlab.com:57288/devstore';
    var connection = mongoose.createConnection(connectionString);

    // console.log(process.env.DEVSTORE_DB_USER);
    // console.log(process.env.DEVSTORE_DB_PASS);
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