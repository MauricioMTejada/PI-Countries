const {Router} = require("express");
const getActivityHandler = require("../handlers/activityHandler")

const activityRouter = Router();

activityRouter.get("/", getActivityHandler);

module.exports = activityRouter;