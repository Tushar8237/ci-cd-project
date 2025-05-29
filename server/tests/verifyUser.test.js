import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import verifyUser from "../middlewares/verify.token.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Protected route for testing
app.get("/protected", verifyUser, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

describe("verifyUser middleware", () => {
  const validUser = { id: "123", name: "Tushar", role: "user" };
  const validToken = jwt.sign(validUser, process.env.JWT_SECRET, { expiresIn: "1h" });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/protected");
    expect(res.status).toBe(401);
  });

  it("should return 403 if token is invalid", async () => {
    const res = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer invalidtoken");
    expect(res.status).toBe(403);
  });


  it("should allow access with valid token", async () => {
    const res = await request(app)
      .get("/protected")
      .set("Authorization", `Bearer ${validToken}`);
    expect(res.status).toBe(200);
    expect(res.body.user).toMatchObject({ id: "123", name: "Tushar", role: "user" });
  });
});