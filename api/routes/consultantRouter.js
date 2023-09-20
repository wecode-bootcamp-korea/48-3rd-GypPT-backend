const express = require("express");

const consultantController = require("../controllers/consultantController");
const consultantRouter = express.Router();

const { loginRequired } = require("../utils/auth");

consultantRouter.post("/posts/upload", consultantController.createConsultant);
consultantRouter.delete("/posts/:postId", consultantController.deleteConsultant);
consultantRouter.get("/posts/list/:thread_types_id", consultantController.getConsultant)

module.exports = { consultantRouter };