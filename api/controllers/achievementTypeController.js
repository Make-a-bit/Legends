import AchievementType from "../models/achievementType.js";

// Get all achievement types
const getAllAchievementTypes = async (req, res, next) => {
    try {
        // Fetch all achievement types from the database
        const [achievementTypes, _] = await AchievementType.findAll();

        // Return the achievement types if found
        // Otherwise return 404
        if (achievementTypes.length > 0) {
            res.status(200).json({
                count: achievementTypes.length,
                data: achievementTypes
            });
        } else {
            res.status(404).json({
                message: "No achievement types found."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Get achievement type by ID
const getAchievementTypeById = async (req, res, next) => {
    try {
        // Get achievement type ID from request parameters
        // Fetch type from the database
        const achievementTypeId = Number(req.params.id);
        const [achievementType, _] = await AchievementType.findById(achievementTypeId);

        // Return the achievement type if found
        // Otherwise return 404
        if (achievementType) {
            res.status(200).json({
                data: achievementType
            });
        } else {
            res.status(404).json({
                message: "Achievement type not found by given id."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Create new achievement type
const createNewAchievementType = async (req, res, next) => {
    try {
        // Destructure the request body and params to get achievement type details
        // Create a new AchievementType instance with the provided details
        // Save the new achievement type to the database and get the result
        let { saavutusluokka } = req.body;
        const achievementType = new AchievementType(saavutusluokka);
        const result = await achievementType.save();

        // If creation was succesfull, respond with success message and achievement type details
        // Otherwise respond with error message
        if (result.success) {
            res.status(201).json({
                message: "Achievement type created successfully:",
                achievementType: achievementType,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Failed to create achievement type:",
                error: result.error
            });
        }
    } catch (error) {
        next(error);
    }
}


// Update achievement type by ID
const updateAchievementType = async (req, res, next) => {
    try {
        // Destructure the request body and params to get achievement type details
        // Create a new AchievementType instance with the provided details
        // Update the achievement type in the database by ID and get the result
        let { saavutusluokka } = req.body;
        const achievementTypeId = Number(req.params.id);
        const achievementType = new AchievementType(saavutusluokka);
        const result = await achievementType.update(achievementTypeId);

        // If update was succesfull, respond with success message and achievement type details
        // Otherwise respond with error message
        if (result.success) {
            res.status(200).json({
                message: "Achievement type updated successfully:",
                achievementType: achievementType,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Failed to update achievement type:",
                error: result.error
            });
        }
    } catch (error) {
        next(error);
    }
}


// Delete achievement type by ID
const deleteAchievementType = async (req, res, next) => {
    try {
        // Get achievement type ID from request parameters 
        // Delete type from the database
        const achievementTypeId = Number(req.params.id);
        const result = await AchievementType.deleteById(achievementTypeId);

        // If deletion was successful, respond with success message
        // Otherwise respond with error message
        if (result.success) {
            res.status(200).json({
                message: `Achievement type ID: ${achievementTypeId} deleted successfully:`,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Failed to delete achievement type:",
                error: result.error
            });
        }
    } catch (error) {
        next(error);
    }
}


export default {
    getAllAchievementTypes,
    getAchievementTypeById,
    createNewAchievementType,
    updateAchievementType,
    deleteAchievementType
}