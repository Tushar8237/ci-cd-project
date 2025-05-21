import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userRoutes from "../routes/user.routes.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const testUserId = new mongoose.Types.ObjectId();
app.use("/api/v1", userRoutes);
app.use(express.json());

beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(
        process.env.MONGO_URI_TEST || "mongodb://localhost:27017/test-user"
    );
});

beforeEach(async () => {
    // Clear existing users
    await User.deleteMany();

    // Insert one user
    await User.create({
        // You can use mongoose.Types.ObjectId("123") but for simplicity use string
        _id: testUserId,
        name: "Tushar",
        email: "tushar@example.com",
        password: "hashedpassword", // this will be excluded due to .select("-password")
        role: "user",
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("User Api", () => {
    const validUser = { id: testUserId, name: "Tushar", role: "user" };
    const validToken = jwt.sign(validUser, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    it("should fetch user profile successfully", async () => {
        const res = await request(app)
            .get("/api/v1/profile")
            .set("Authorization", `Bearer ${validToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("user");
    });

    it("should update user profile successfully", async () => {
        const res = await request(app)
            .put(`/api/v1/update/${validUser.id}`)
            .set("Authorization", `Bearer ${validToken}`)
            .send({
                name: "Updated Name",
                email: "updated@example.com",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("success", true);
        expect(res.body.message).toMatch(/Profile updated successfully/i);
    });
});
