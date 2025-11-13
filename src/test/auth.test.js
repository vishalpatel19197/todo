const request = require("supertest");
const app = require("..");

describe("POST /api/login", () => {
  const validUser = {
    email: "admin@gmail.com",
    password: "Admin",
  };

  test("should login successfully with correct credentials", async () => {
    const res = await request(app)
      .post("/api/v1/singin")
      .send(validUser)
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data).toHaveProperty("email");
    expect(res.body.data).toHaveProperty("email", validUser.email);
  });

    test("should fail with 401 for wrong password", async () => {
      const res = await request(app)
        .post("/api/v1/singin")
        .send({
          email: validUser.email,
          password: "WrongPassword",
        })
        .expect(401); // Unauthorized

      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toMatch(/invalid/i);
    });

    test("should fail with 400 when email is missing", async () => {
      const res = await request(app)
        .post("/api/v1/singin")
        .send({
          password: "Password123",
        })
        .expect(400); // Bad Request for validation error

      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toMatch("Validation Error");
    });

    test("should fail with 400 when password is missing", async () => {
      const res = await request(app)
        .post("/api/v1/singin")
        .send({
          email: "someuser@example.com",
        })
        .expect(400);

      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toMatch("Validation Error");
    });

    test("should fail with 401 for non-existing user", async () => {
      const res = await request(app)
        .post("/api/v1/singin")
        .send({
          email: "does-not-exist@example.com",
          password: "AnyPassword123",
        })
        .expect(404);

      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toMatch("User Not Found");
    });
});
