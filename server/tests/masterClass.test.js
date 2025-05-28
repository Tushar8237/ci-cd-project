import { jest } from "@jest/globals";

jest.unstable_mockModule("../middlewares/verify.token.js", () => ({
  __esModule: true,
  default: (req, res, next) => {
    console.log("✅ Mock verifyUser called");
    req.user = { role: "admin" };
    next();
  },
}));

jest.unstable_mockModule("../middlewares/isAdmin.js", () => ({
  __esModule: true,
  default: () => (req, res, next) => {
    console.log("✅ Mock isAdmin called");
    next();
  },
}));

jest.unstable_mockModule("../middlewares/validation.middleware.js", () => ({
  __esModule: true,
  default: () => (req, res, next) => {
    next();
  },
}));

jest.unstable_mockModule("../models/masterClass.model.js", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: "mock-id",
        courseName:
          "Advanced Data Structures, Algorithms and System Design Course",
        batchDate: "26th September",
        currentFees: 44999,
        discount: 25,
        discountDate: "10th September",
        classTimings: "9am - 11:30am",
      }),
    })),
  };
});

describe("Master class Api", () => {
  let app, request;

  beforeAll(async () => {
    const express = (await import("express")).default;
    request = (await import("supertest")).default;
    const masterClassRoutes = (await import("../routes/masterClass.routes.js"))
      .default;

    app = express();
    app.use(express.json());
    app.use("/api/v1/", masterClassRoutes);
  });

  it("Should add master class successfully", async () => {
    const res = await request(app).post("/api/v1/master-class").send({
      courseName:
        "Advanced Data Structures, Algorithms and System Design Course",
      batchDate: "26th September",
      currentFees: 44999,
      discount: 25,
      discountDate: "10th September",
      classTimings: "9am - 11:30am",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/Master class added successfully/);
  });
});
