var app = require('./app');
var mongoose = require('mongoose');
var _ = require('underscore');
var moment = require('moment');

var encode = function (entry) {
        return encode(entry);
};

var decode = function (entry) {
        return decode(entry);
        //return "duck";
};

var recordSchema = {
        // _id: { type: String },
        appId: { type: String, required: true },
        notes: { type: String, required: true},
        url: { type: String, required: true, unique : true },
        version: { type: String, required: true, unique : true },
        date: { type: Date, default: Date.now }
        };

var schema = new mongoose.Schema(recordSchema, { timestamps: true });

schema.virtual('releaseNotes').get(function () {
        return this.notes;
});

schema.virtual('dateUploaded').get(function () {
        return moment(this.date).zone(-60).format("DD/MM/YY hh:mm a");
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', {transform: function(doc, result, options) {
        return {
                version: result.version,
                releaseNotes: result.releaseNotes,
                id: result.id,
                dateUploaded: result.dateUploaded,
                url: result.url
        };
}, virtuals: true });

module.exports = schema;



