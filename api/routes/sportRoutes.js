import express from "express";
import controller from "../controllers/sportController.js";

const sportRoutes = express.Router();

sportRoutes
    .route("/")
    .get(controller.getAllSports)
    .post(controller.createNewSport);

sportRoutes
    .route("/:id")
    .get(controller.getSportById)
    .put(controller.updateSport)
    .delete(controller.deleteSport);

export default sportRoutes;
