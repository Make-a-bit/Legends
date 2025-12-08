import express from "express";
import controller from "../controllers/eventController.js"; 

const eventRoutes = express.Router();

eventRoutes
    .route("/")
    .get(controller.getAllEvents)
    .post(controller.createNewEvent);

eventRoutes
    .route("/:id")
    .get(controller.getEventById)
    .put(controller.updateEvent)
    .delete(controller.deleteEvent);

export default eventRoutes;