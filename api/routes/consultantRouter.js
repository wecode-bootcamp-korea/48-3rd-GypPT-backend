const express = require("express");

const consultantController = require("../controllers/consultantController");
const consultantRouter = express.Router();

const { loginRequired } = require("../utils/auth");

consultantRouter.post("/posts/upload", consultantController.createConsultant);
consultantRouter.delete("/posts/:postId", consultantController.deleteConsultant);

module.exports = { consultantRouter };