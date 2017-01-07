/**
 * Created by Hamza Fetuga on 1/5/2017.
 */
var mongoose = require('mongoose');

var appSchema = {
        // _id: {type: String},
        name: {type: String, required: true, unique: true },
        description: {type: String}
    };

module.exports = new mongoose.Schema(appSchema);
module.exports.appSchema = appSchema;


