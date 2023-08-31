const request = require("supertest");
const server = require("../../server/server");
const mongoose = require("mongoose");

describe("Server Tests", () => {
    beforeAll((done) => {
      done();
    });

    afterAll((done) => {
      mongoose.connection.close();
      done();
    });
  test("Debería iniciar el servidor y responder con código 200", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
  });
});
