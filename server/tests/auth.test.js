/* eslint-env jest */
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import express from "express";
import authRoutes from "../routes/auth.routes.js";
import User from "../models/user.model.js";
import { errorHandler } from "../middlewares/error.handler.js";

const app = express();
app.use(express.json());
app.use("/api/v1", authRoutes);
app.use(errorHandler);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany(); // clean up after each test
});

describe("Auth API", () => {
    it("Should register a new user successfully", async () => {
        const res = await request(app).post("/api/v1/register").send({
            name: "testuser",
            email: "test@example.com",
            password: "Test@1234",
        });

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("userWithoutPass");
        expect(res.body.userWithoutPass).not.toHaveProperty("password");
    });

    it("should return 400 for duplicate email registration", async () => {
        await request(app).post("/api/v1/register").send({
            name: "testuser",
            email: "duplicate@example.com",
            password: "Test@1234",
        });

        const res = await request(app).post("/api/v1/register").send({
            name: "testuser2",
            email: "duplicate@example.com",
            password: "Test@5678",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("success", false);
        expect(res.body.message).toMatch(/user already exists/i); // matches "Duplicate field..."
    });

    it("should return 400 for missing required fields", async () => {
        const res = await request(app).post("/api/v1/register").send({
            email: "no-password@example.com",
            // password is missing
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("success", false);
        expect(res.body.message).toMatch(/name.*required/i)
    });

    it("should store a hashed password in DB", async () => {
        await request(app).post("/api/v1/register").send({
            name: "testuser",
            email: "test@example.com",
            password: "Test@1234",
        });

        const user = await User.findOne({ email: "test@example.com" });
        expect(user).toBeTruthy();
        expect(user.password).not.toBe("Test@1234"); // should be hashed
    });

    it("should return 404 for login with non-existent user", async () => {
        const res = await request(app).post("/api/v1/login").send({
            email: "fake@example.com",
            password: "fakepassword",
        });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("success", false);
        expect(res.body).toHaveProperty(
            "message",
            "User not found or invalid credential"
        );
    });
});
