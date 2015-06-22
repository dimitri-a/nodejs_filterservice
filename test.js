"use strict";

var request = require('supertest');
var assert = require('assert');
var app = require('./server');
var agent = request.agent(app);

describe('Testing filter', function() {
    it('should return a valid response', function (done) {
        var validJson = require('./validJson.json');
        var validResponse= require('./validResponse.json');
        agent.post('/')
            .send(validJson)
            .expect(200, validResponse)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });
    });

    it('should return an error response', function (done) {
        var errorResponse=require('./errorResponse.json');
        agent.post('/')
            .send("1")
            .expect(400,errorResponse)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });
    });
});