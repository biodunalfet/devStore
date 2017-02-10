/**
 * Created by Hamza Fetuga on 2/9/2017.
 */
"use strict"

var mongoose = require("mongoose");
var status = require('http-status');
var Record = require("../data/models")().Record;

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect;

var appName = "pronov";

chai.use(chaiHttp);

describe('Records', function(){

    /**
     *  Test the /GET Route
     */
    describe('/GET Records', function () {
        it('it should get all records for specified app', function(done){
           chai.request(server)
               .get('/api/v1/record/' + appName)
               .end(function (err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.have.property('data');
                   expect(res.body.data).to.be.a('array');
                   expect(err).to.be.null;
                   done();
               });
       });

        it('it should return a 404 if app is not found', function(done){
            chai.request(server)
                .get('/api/v1/record/' + 'qwerty123')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.eql('App not found');
                    expect(err).not.to.be.undefined;
                    done();
                });
        });

        it('it should return the total number of records of existing app', function (done) {
           chai.request(server)
               .get('/api/v1/count/' + appName)
               .end(function (err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.have.property('count');
                   expect(res.body.count).to.be.a('number');
                   expect(err).to.be.null;
                   done();
               })
        });

        it('it should return an error while getting count for non existing app', function (done) {
            chai.request(server)
                .get('/api/v1/count/' + 'qwerty123')
                .end(function (err, res) {
                    expect(res).to.have.status(status.OK);
                    expect(res.body).to.have.property('count').eql(0);
                    expect(err).to.be.null;
                    done();
                })
        });
        
    });

    /**
     * Test the /POST route
     */

    describe('/POST Records', function () {

        var newApp = {
            notes : 'Note 1',
            url : 'https://www.nothing.com',
            version : '1.0.0'
        };

       it('it should add a new record for an existing app', function (done) {

           chai.request(server)
               .post('/api/v1/record/' + appName)
               .send(newApp)
               .end(function (err, res){
                   expect(res).to.have.status(status.OK);
                   expect(res.body).to.have.property('message').eql('Record successfully added');
                   done();
               });
       });

        after('remove added test record', function (done) {

            chai.request(server)
                .del('/api/v1/record/' + appName + '/' + newApp.version)
                .end(function (err, res){
                    expect(res).to.have.status(status.OK);
                    expect(res.body).to.have.property('message').eql('Record deleted successfully');
                    done();
                });
        });
    });

});