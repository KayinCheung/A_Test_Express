const app = require('../../app.js')
const request = require('supertest');
const mongoose = require('mongoose')

const testAddHistory = data => request(app)
    .post('/history/add')
    .set('Accept', 'application/json')
    .send(data);

/*
Test 1) Valid input should return "History Added"
Test 2) Missing username input, should return "Invalid Input"
*/

describe('Add History', () => {

    afterAll(async () =>{
        await mongoose.connection.close()
    })

    it('All fields provided, it should return success', (done) => {
        testAddHistory({
            username: 'TestOnly',
            title: 'Test Title',
            description: 'Test Description',
            videoUrl: 'Test VideoURL',
            imageUrl: 'Test Image Url',
        })
            .expect(200)
            .end((err, res) => {
                expect(res.body.status).toBe("History Added");
                done();
            });
    });

    it('No username provided, it should return failure', (done) => {
        testAddHistory({
            title: 'Test Title',
            description: 'Test Description',
            videoUrl: 'Test VideoURL',
            imageUrl: 'Test Image Url',
        })
            .expect(400)
            .end((err, res) => {
                expect(res.body.status).toBe("Invalid inputs");
                done();
            });
    });

})