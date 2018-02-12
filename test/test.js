const request = require('request');
const chai = require('chai');
const expect = require('chai').expect;

let URL ='http://localhost:3000/';

describe('Testing Imageation', function(){
	it('should give me a 200/OK response', function(done) {
		request(URL, function(error, apiResponse, apiBody){
			console.log(error);
			console.log(apiResponse);
			expect(apiResponse.statusCode).to.eq(200);
			done();
		});
	});
	it('should list ALL projects on /projects GET', function(done) {
  		chai.request(URL)
    	.get('/projects')
    	.end(function(err, res){
      	res.should.have.status(200);
      	res.should.be.json();
      	res.body.should.be.a('array');
      	done();
    	});
	});
	it ('should have a sentence in the body', function(done) {
		request(URL, function(error, apiResponse, apiBody) {
			console.log(apiBody);
			expect(JSON.parse(apiBody).sentence).to.not.be.empty;
			done();
		});
	});
	it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
	it("returns Hello World", function(done) {
      request.get(URL, function(error, response, body) {
        //expect(body).toBe("Hello World");
        assert.equal("Hello World", body);
        helloWorld.closeServer();
        done();
      });
    });
    
