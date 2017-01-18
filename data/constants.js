/**
 * Created by Hamza Fetuga on 1/18/2017.
 */

var devUrl = "http://localhost:3000";
var prodUrl = "https://arcane-fortress-56188.herokuapp.com"; //This is mine. Change it to yours
var config = require('../config');
var localConnectionString = 'mongodb://localhost:27017/devstore';

module.exports = function () {

    var useUrl = devUrl;
    var useConnectionString = localConnectionString;
    var prodConnectionString = "";

    if (config().mode.app == 1){
        useUrl = prodUrl
    }

    var username = process.env.DEVSTORE_DB_USER;
    var password = process.env.DEVSTORE_DB_PASS;

    prodConnectionString = 'mongodb://' + username + ':' + password + '@ds157288.mlab.com:57288/devstore';

    if (config().mode.db == 1){
        useConnectionString = prodConnectionString;
    }

    return {

        urls : {
            devUrl : devUrl,
            liveUrl : prodUrl,
            useUrl : useUrl
        },
        connectionStrings : {
            localConnectionString : localConnectionString,
            prodConnectionString : prodConnectionString,
            useConnectionString : useConnectionString
        }

    }
};