import express from "express";
import controller from "../controllers/countryController.js"; 

const countryRoutes = express.Router(); 

countryRoutes
    .route("/")
    .get(controller.getAllCountries)
    .post(controller.createNewCountry);

countryRoutes
    .route("/:id") 
    .get(controller.getCountryById)
    .put(controller.updateCountry)
    .delete(controller.deleteCountry);

export default countryRoutes;