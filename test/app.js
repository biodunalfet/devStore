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

var crypto = require('crypto');

var appName = "pronov";

chai.use(chaiHttp);

describe('Records', function() {

    /**
     *  Test the /GET Route
     */
    describe('/GET App', function () {
        it('it should return all apps', function (done) {
            chai.request(server)
                .get('/api/v1/app')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').eq("success");
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.be.a('array');
                    expect(err).to.be.null;
                    done();
                })
        });
    });

    /**
     * Test the /POST Route
     */
    describe('/POST App', function() {

        var goodApp = {
            name: crypto.randomBytes(20).toString('hex')
        };

        var exisitingApp = {
            name: 'pronov'
        };

        var noNameApp = {
            name: ''
        };


        describe('/POST Valid App', function () {
            it('it adds a valid new app', function (done) {
                chai.request(server)
                    .post('/api/v1/app')
                    .send(goodApp)
                    .end(function (err, res){
                        expect(res).to.have.status(status.OK);
                        expect(res.body).to.have.property('message').eql('App successfully added');
                        done();
                    });
            });

            after('delete added app', function (done) {
                chai.request(server)
                    .del('/api/v1/app/' + goodApp.name)
                    .end(function (err, res){
                        expect(res).to.have.status(status.OK);
                        expect(res.body).to.have.property('message').eql('App deleted successfully');
                        done();
                    });
            });
        });



        it('it does not add a without a name', function (done) {
            chai.request(server)
                .post('/api/v1/app')
                .send(noNameApp)
                .end(function (err, res){
                    expect(res).to.have.status(status.BAD_REQUEST);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('it does not add an existing app', function (done) {
            chai.request(server)
                .post('/api/v1/app')
                .send(exisitingApp)
                .end(function (err, res){
                    expect(res).to.have.status(status.BAD_REQUEST);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });


    });

});