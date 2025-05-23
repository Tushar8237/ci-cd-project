import express from "express";
import request from "supertest";
import checkRole from "../middlewares/isAdmin.js";

describe("checkRole Middleware", () => {
    let app;

    beforeEach(() => {
        app = express();

        // Dummy route for testing
        app.get(
            "/admin-only",
            (req, res, next) => {
                req.user = { id: 123, role: "admin" };
                next();
            },
            checkRole("admin"),
            (req, res) => {
                res.status(200).json({
                    message: "Access granted",
                });
            }
        );
    });

    it("should allow access ti user with correct role", async () => {
        const res = await request(app).get("/admin-only");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Access granted");
    });

    it("should block access for incorrect role", async () => {
        app.get(
            "/user-only",
            (req, res, next) => {
                req.user = { id: "123", role: "user" }; // simulate regular user
                next();
            },
            checkRole("admin"),
            (req, res) => {
                res.status(200).json({ message: "Should not get here" });
            }
        );

        const res = await request(app).get("/user-only");
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toMatch(/Forbidden. admin role required./);
    });

    it("should return 401 if no user is found", async () => {
        app.get("/no-user", checkRole("admin"), (req, res) => {
            res.status(200).json({ message: "Should not get here" });
        });

        const res = await request(app).get("/no-user");
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toMatch(/Unauthorized/);
    });
});
