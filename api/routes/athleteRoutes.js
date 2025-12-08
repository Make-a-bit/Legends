import express from "express";
import controller from "../controllers/athleteController.js";

const athleteRoutes = express.Router();

athleteRoutes
    .route("/")
    .get(controller.getAllAthletes)
    .post(controller.createNewAthlete);

athleteRoutes
    .route("/:id")
    .get(controller.getAthleteById)
    .put(controller.updateAthlete)
    .delete(controller.deleteAthlete);

export default athleteRoutes;
