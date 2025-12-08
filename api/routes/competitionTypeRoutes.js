import express from "express";
import controller from "../controllers/competitionTypeController.js";

const competitionTypeRoutes = express.Router();

competitionTypeRoutes
    .route("/")
    .get(controller.getAllCompetitionTypes)
    .post(controller.createNewCompetitionType);

competitionTypeRoutes
    .route("/:id")
    .get(controller.getCompetitionById)
    .put(controller.updateCompetitionType)
    .delete(controller.deleteCompetitionType);

export default competitionTypeRoutes;