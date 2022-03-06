let chai = require('chai');
let chaiHttp  = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

// const start_server = require("../index"); (Need to start the server separately and start testing only after mongo is connected);
const url = 'http://localhost:3000';

const Testing_NAME = "testCRUDName"

describe('Mocha Test on http://localhost:3000/ for Express Mongo CRUD', () => {

    it('GET / : should return status 200', (done)=>{
        chai.request(url)
            .get('/')
            .then( (res) =>{
                console.log(res.status);
                expect(res).to.have.status(200)
                done()
            })
            .catch((err)=>{ throw(err) })
    })

    it('POST /add/ : should insert user into mongodb', (done)=>{
        chai
            .request(url)
            .post('/add')
            .send({
                name: Testing_NAME,
                message : "A Random Data"
            })
            .then( (res)=>{
                console.log(res.status);
                expect(res).to.have.status(200)
                done()
            })
            .catch((err)=>{ throw(err) })
    })

    it('POST /add without body this IS A NEGATIVE TEST CASE, it should not pass', (done)=>{
        chai
            .request(url)
            .post('/add/')
            .send({ })
            .then( (res)=>{
                console.log(res.status);
                expect(res).to.have.status(200)
                done()
            })
            .catch((err)=>{ throw(err) })
    })

    it('GET /read/name : read data from db', (done)=>{
        chai
            .request(url)
            .get('/read/' + Testing_NAME)
            .then( (res) =>{
                expect(res).to.have.status(200)
                done()
            })
            .catch((err)=>{ throw(err) })
    })

    it('GET /read/bad_name : this IS A NEGATIVE TEST CASE, it should not pass', (done)=>{
        chai
            .request(url)
            .get('/read/example_Failing_name')
            .then( (res) =>{
                expect(res).to.have.status(200)
                done() 
            })
            .catch((err)=>{ throw(err) })
    })

    it('PUT /update/ : Update user in db', (done)=>{
        chai
            .request(url)
            .put('/update')
            .send({
                name: Testing_NAME,
                message : "Send anything, there is no schema"
            })
            .then( (res)=>{
                expect(res).to.have.status(200)
                done()
            })
            .catch((err)=>{ throw(err) })
    })

    it('PUT /update/ without body :  this IS A NEGATIVE TEST CASE, it should not pass', (done)=>{
        chai
            .request(url)
            .put('/update')
            .send({})
            .then( (res)=>{
                expect(res).to.have.status(200)
                done()
            })
            .catch((err)=>{ throw(err) })
    })

    it('DELETE /delete/:name : should delete user from mongodb', (done)=>{
        chai
            .request(url)
            .delete('/delete/' + Testing_NAME)
            .then( (res) =>{
                expect(res).to.have.status(200)
                done() 
            })
            .catch((err)=>{ throw(err) })
    })

    it('DELETE /delete/invalidName :  this IS A NEGATIVE TEST CASE, it should not pass', (done)=>{
        chai
            .request(url)
            .delete('/delete/example_Failing_name')
            .then( (res) =>{
                expect(res).to.have.status(200);
                done() 
            })
            .catch((err)=>{ throw(err) })
    })

})