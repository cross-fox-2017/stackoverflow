const chai = require('chai');
const should = chai.should() //Should
const expect = chai.expect; //expect
const chaiHttp = require('chai-http');
chai.use(chaiHttp)



describe('Testing Blog TTD', function() {
    it('Testing Register', function(done) {
        chai.request('http://localhost:3000')
            .post('/api/register')
            .send({
                name: "user",
                email: "user@gmail.com",
                password: "user@gmail.com"
            })
            .end(function(err, res) {
                res.body.should.have.property('_id');
            })
            done()

    })
    it('Testing Login', function(done) {
        chai.request('http://localhost:3000')
            .post('/api/login')
            .send({
                email: "user@gmail.com",
                password: "user@gmail.com"
            })
            .end(function(err, res) {
                res.body.should.have.property('token');
            })
            done()
    })
    it('Remove User', function(done) {
        chai.request('http://localhost:3000')
            .delete('/api/delete')
            .send({
                email: "user@gmail.com"
            })
            .end(function(err, res) {
                res.body.should.have.property('status');
            })
            done()
    })
})
