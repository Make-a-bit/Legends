import express from "express";
import controller from "../controllers/achievementTypeController.js"; 

const achievementTypeRoutes = express.Router();

achievementTypeRoutes
    .route("/")
    .get(controller.getAllAchievementTypes)
    .post(controller.createNewAchievementType);

achievementTypeRoutes
    .route("/:id")
    .get(controller.getAchievementTypeById)
    .put(controller.updateAchievementType)
    .delete(controller.deleteAchievementType);

export default achievementTypeRoutes;