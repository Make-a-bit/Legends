import express from "express";
import controller from "../controllers/achievementController.js";

const achievementRoutes = express.Router();

achievementRoutes
    .route("/")
    .get(controller.getAllAchievements)
    .post(controller.createNewAchievement);

achievementRoutes
    .route("/:id")
    .get(controller.getAchievementById)
    .put(controller.updateAchievement)
    .delete(controller.deleteAchievement);

export default achievementRoutes;