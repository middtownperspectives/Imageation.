//Require the dev-dependencies
const chai = require('chai');
const should = chai.should();
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const request = require('request');
const server = require('../app');
const URL ='http://localhost:3000/';

chai.use(chaiHttp);

describe('Testing Imageation', function(done){
	it('should give me a 200/OK response', function(done) {
		request(URL, function(error, apiResponse, apiBody){
			//console.log(error);
			//console.log(apiResponse);
			expect(apiResponse.statusCode).to.eq(200);
			done();
		});
	});
	it('should list ALL projects on /projects GET', function(done) {
  		chai.request(URL)
    	.get('/projects')
    	.end(function(err, res){
      	res.should.be.a('object');
      	done();
    	});
	});
	it ('should have a sentence in the body', function(done) {
		request(URL, function(error, apiResponse, apiBody) {
			//console.log(apiBody);
			expect(JSON.parse(apiBody).sentence).to.be.a('string');
			done();
		});
		done();
	});
});    
