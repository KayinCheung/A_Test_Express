const app = require("../../app.js");
const request = require("supertest");
const mongoose = require("mongoose");

const testAddHistory = data =>
  request(app)
    .post("/history/add")
    .set("Accept", "application/json")
    .send(data);

/*
Test 1) Valid input should return "History Added"
Test 2) Missing username input, should return "Invalid Input"
*/

describe("/History", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST History", () => {
    it("All fields provided, it should return success", done => {
      testAddHistory({
        username: "TestOnly",
        title: "Test Title",
        description: "Test Description",
        videoUrl: "Test VideoURL",
        imageUrl: "Test Image Url"
      })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).toBe("ok");
          done();
        });
    });

    it("No username provided, it should return failure", done => {
      testAddHistory({
        title: "Test Title",
        description: "Test Description",
        videoUrl: "Test VideoURL",
        imageUrl: "Test Image Url"
      })
        .expect(400)
        .end((err, res) => {
          expect(res.body.status).toBe("Invalid input");
          done();
        });
    });
  });

  describe("GET History", () => {
    it("Page 1 of user kayin should have 10 entries", done => {
      request(app)
        .get(`/history?username=kayin&page=0`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.length).toBe(10);
          done();
        });
    });

    it("Page 9999 of user kayin should have NO entries", done => {
      request(app)
        .get(`/history?username=kayin&page=9999`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.length).toBe(0);
          done();
        });
    });

    it("String as page should return 400, with status Invalid input", done => {
      request(app)
        .get(`/history?username=kayin&page=aaa`)
        .expect(400)
        .end((err, res) => {
          expect(res.body.status).toBe("Invalid input");
          done();
        });
    });

    it("Negative number as page should return 400, with status Invalid input", done => {
      request(app)
        .get(`/history?username=kayin&page=-2`)
        .expect(400)
        .end((err, res) => {
          expect(res.body.status).toBe("Invalid input");
          done();
        });
    });

    const nonExistentUser = "0x1c02ce498dc6d0d6ef05a253e021258b07eeba91";

    it("Non existent user as username should return status 200, but no history data", done => {
      request(app)
        .get(`/history?username=${nonExistentUser}&page=0`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.length).toBe(0);
          expect(res.body.pages).toBe(0);
          done();
        });
    });
  });
});
