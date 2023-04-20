const { Router } = require("express");
const {
  getActivityHandler,
  createActivityHandler,
} = require("../handlers/activityHandler");

const activityRouter = Router();

activityRouter.get("/", getActivityHandler);

activityRouter.post("/", createActivityHandler);

module.exports = activityRouter;
