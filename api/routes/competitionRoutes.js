import express from "express";
import controller from "../controllers/competitionController.js";

const competitionRoutes = express.Router();

competitionRoutes
    .route("/")
    .get(controller.getAllCompetitions)
    .post(controller.createNewCompetition);

competitionRoutes
    .route("/:id")
    .get(controller.getCompetitionById)
    .put(controller.updateCompetition)
    .delete(controller.deleteCompetition);

export default competitionRoutes;