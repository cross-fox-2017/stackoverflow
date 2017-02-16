// const chai = require('chai');
// const should = chai.should()
// const expect = chai.expect;
// const chaiHttp = require('chai-http')
// chai.use(chaiHttp)
//
//
// describe('Testing Artikel', function() {
//     it('Testing add', function(done) {
//         chai.request('http://localhost:3000')
//             .post('/artikel/add')
//             .send({
//                 title: "belajar",
//                 isi: "belajar js",
//                 author: "hacktiv8"
//             })
//             .end(function(err, res) {
//                 res.body.should.have.property('_id');
//             })
//             done()
//
//     })
//     it('Testing Show', function(done) {
//         chai.request('http://localhost:3000')
//             .get('/artikel/show')
//             .end(function(err, res) {
//                 res.body.should.have.property('_id');
//             })
//             done()
//     })
//     it('Remove Artikel', function(done) {
//         chai.request('http://localhost:3000')
//             .delete('/artikel/delete')
//             .send({
//                 title: "belajar"
//             })
//             .end(function(err, res) {
//                 res.body.should.have.property('status');
//             })
//             done()
//     })
// })
