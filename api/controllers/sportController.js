import Sport from "../models/Sport.js"; 

// Get all sports
const getAllSports = async (req, res, next) => {
    try {
        // Fetch all sports from the database
        const [sports, _] = await Sport.findAll();

        // If sports are found, respond with the data
        // Otherwise, send a 404 error
        if (sports.length > 0) {
            res.status(200).json({
                count: sports.length,
                data: sports
            });
        } else {
            res.status(404).json({
                message: "No sports found."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Get sport by ID
const getSportById = async (req, res, next) => {
    try {
        // Get sport ID from request parameters
        // Fetch the sport from the database
        const sportId = Number(req.params.id);
        const [sport, _] = await Sport.findById(sportId);

        // If sport is found, respond with the data
        // Otherwise, send a 404 error
        if (sport.length > 0) {
            res.status(200).json({
                data: sport
            });
        } else {
            res.status(404).json({
                message: "Sport not found by given id."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Create new sport
const createNewSport = async (req, res, next) => {
    try {
        // Destructure the request body and params to get sport details
        // Create a new Sport instance with the provided details
        // Save the new sport to the database and get the result
        let { kategoria } = req.body;
        const sport = new Sport(kategoria);
        const result = await sport.save();

        // If creation was successful, respond with success message and sport details
        // Otherwise send a 400 error with the failure reason
        if (result.success) {
            res.status(201).json({
                message: "Sport created successfully:",
                sport: sport,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Failed to create sport:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


// Update sport by ID
const updateSport = async (req, res, next) => {
    try {
        // Destructure the request body and params to get sport details
        // Create a new Sport instance with the provided details
        // Update the sport in the database by ID and get the result
        let { kategoria } = req.body;
        const sportId = Number(req.params.id);
        const sport = new Sport(kategoria);
        const result = await sport.update(sportId);

        // If update was successful, respond with success message and sport details
        // Otherwise send a 400 error with the failure reason
        if (result.success) {
            res.status(200).json({
                message: `Sport ID: ${sportId} updated successfully:`,
                sport: sport,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Sport update failed:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


// Delete sport by ID
const deleteSport = async (req, res, next) => {
    try {
        // Get sport ID from request parameters
        // Delete the sport from the database
        const sportId = Number(req.params.id);
        const result = await Sport.deleteById(sportId);

        // Respond with success message if deletion was successful
        // Otherwise send a 404 error if sport was not found
        if (result.success) {
            res.status(200).json({
                message: `Sport ID: ${sportId} deleted successfully:`,
                dbResult: result
            });
        } else {
            res.status(404).json({
                message: "Sport deletion failed:",
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


export default {
    getAllSports,
    getSportById,
    createNewSport,
    updateSport,
    deleteSport
}