jest.setTimeout(10000);
const request = require("supertest");
const app = require("./index");

describe("Users API Endpoints", () => {
  let testUserId;

//happy path tests
  it("GET / — should return info message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("info");
  });

  it("GET /users — should return an array", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /users — should create a new user", async () => {
    const res = await request(app)
      .post("/users/")
      .send({ name: "Test User", email: "test@example.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test User");
    expect(res.body.email).toBe("test@example.com");

    testUserId = res.body.id; 
  });

  it("GET /users/:id — should return a user if exists", async () => {
    const res = await request(app).get(`/users/${testUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Test User");
  });

  it("PATCH /users/:id — should update a user", async () => {
    const res = await request(app)
      .patch(`/users/${testUserId}`)
      .send({ name: "Updated User", email: "updated@example.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated User");
    expect(res.body.email).toBe("updated@example.com");
  });
//hapi path for delete user
  it("DELETE /users/:id - should delete a user", async () => {
    const res = await request(app)
      .delete(`/users/${testUserId}`);
    expect(res.statusCode).toBe(200);
  });
  
//sad path for invalid id
  it("PATCH /users/:id — should return 404 if user not found", async () => {
    const res = await request(app)
      .patch("/users/999999")
      .send({ name: "No User", email: "no@example.com" });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

//sad path for missing name/email.
  it("POST/users - should return 400 if name or email is missing", async () => {
    const res = await request(app)
      .post("/users/")
      .send({ })
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /users/:id - should return 404 if user is not found", async () => {
    const res = await request(app)
      .get("/users/999999")
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("DELETE /users/:id - should return 404 if user is not found", async () => {
    const res = await request(app)
      .delete("/users/999999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  })
});
