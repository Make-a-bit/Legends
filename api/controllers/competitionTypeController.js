import CompetitionType from "../models/CompetitionType.js";

// Get all competition types
const getAllCompetitionTypes = async (req, res, next) => {
    try {
        // Fetch all competition types from the database
        const [competitionTypes, _] = await CompetitionType.findAll();

        // Respond with the list of competition types if found
        // Otherwise send a 404 status
        if (competitionTypes.length > 0) {
            res.status(200).json({
                count: competitionTypes.length,
                data: competitionTypes
            });
        } else {
            res.status(404).json({
                message: "No competition types found."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Get competition type by ID
const getCompetitionById = async (req, res, next) => {
    try {
        // Extract competition type ID from request parameters 
        // Fetch the competition type from the database
        const competitionId = req.params.id;
        const [competition, _] = await CompetitionType.findById(competitionId);

        // Respond with the competition type if found
        // Otherwise send a 404 status
        if (competition.length > 0) {
            res.status(200).json({
                data: competition
            });
        } else {
            res.status(404).json({
                message: "Competition type not found."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Create new competition type
const createNewCompetitionType = async (req, res, next) => {
    try {
        // Destructure the request body to get competition type details
        // Create a new CompetitionType instance with the provided details
        // Save the new competition type to the database and get the result
        let { kisatyyppi, ranking_value } = req.body;
        const competitionType = new CompetitionType(kisatyyppi, ranking_value);
        const result = await competitionType.save();

        // Respond with success message and competition type details
        // Otherwise send a 400 status if creation failed
        if (result.success) {
            res.status(201).json({
                message: "Competition type created:",
                competitionType: competitionType,
                dbResult: result
            });

        } else {
            res.status(400).json({
                message: "Failed to create competition type:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


// Update competition type by ID
const updateCompetitionType = async (req, res, next) => {
    try {
        // Destructure the request body and params to get competition type details
        // Create a new CompetitionType instance with the provided details
        // Update the competition type in the database and get the result
        let { kisatyyppi, ranking_value } = req.body;
        const competitionTypeId = Number(req.params.id);
        const competitionType = new CompetitionType(kisatyyppi, ranking_value);
        const result = await competitionType.update(competitionTypeId);

        // If update was successful, respond with success message and competition type details
        // Otherwise send a 400 status if update failed
        if (result.success) {
            res.status(200).json({
                message: `Competition type ID: ${competitionTypeId} updated successfully:`,
                competitionType: competitionType,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Competition type update failed:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


// Delete competition type by ID
const deleteCompetitionType = async (req, res, next) => {
    try {
        // Extract competition type ID from request parameters
        // Delete the competition type from the database and get the result
        const competitionId = Number(req.params.id);
        const result = await CompetitionType.deleteById(competitionId);

        // Respond with success message if deletion was successful
        // Otherwise send a 404 status
        if (result.success) {
            res.status(200).json({
                message: `Competition type ID: ${competitionId} deleted successfully.`,
                dbResult: result
            });
        } else {
            res.status(404).json({
                message: "Competition type deletion failed:",
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


export default {
    createNewCompetitionType,
    getAllCompetitionTypes,
    getCompetitionById,
    deleteCompetitionType,
    updateCompetitionType
};