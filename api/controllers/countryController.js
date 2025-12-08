import Country from "../models/Country.js";

// Get all countries
const getAllCountries = async (req, res, next) => {
    try {
        // Fetch all countries from the database
        const [countries, _] = await Country.findAll();

        // Respond with countries if found
        // Otherwise respond with not found message
        if (countries.length > 0) {
            res.status(200).json({
                count: countries.length,
                data: countries
            });
        } else {
            res.status(404).json({
                message: "No countries found in the database."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Get country by ID
const getCountryById = async (req, res, next) => {
    try {
        // Get country ID from request parameters and fetch the country from the database
        const countryId = Number(req.params.id);
        const [country, _] = await Country.findById(countryId);

        // Respond with country details if found
        // Otherwise respond with not found message
        if (country.length > 0) {
            res.status(200).json({
                data: country
            });
        } else {
            res.status(404).json({
                message: "Country not found by given id."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Create new country
const createNewCountry = async (req, res, next) => {
    try {
        // Destructure the request body to get country details
        // Create a new Country instance with the provided details
        // Save the new country to the database and get the result
        let { maa, lippu_url } = req.body;
        const country = new Country(maa, lippu_url);
        const result = await country.save();

        // Respond with success message and country details
        // Otherwise respond with error message
        if (result.success) {
            res.status(201).json({
                message: "Country created successfully:",
                id: result.id,
                country: country
            });
        } else {
            res.status(400).json({
                message: "Country creation failed:",
                error: result.error
            });
        }
    } catch (error) {
        next(error);
    }
}


// Update country by ID
const updateCountry = async (req, res, next) => {
    try {
        // Destructure the request body and params to get country details
        // Create a new Country instance with the provided details
        // Update the country in the database and get the result
        let { maa, lippu_url } = req.body;
        const countryId = Number(req.params.id);
        const country = new Country(maa, lippu_url);
        const result = await country.update(countryId);

        console.log(country);

        // Respond with success message and country details
        // Otherwise respond with error message
        if (result.success) {
            res.status(200).json({
                message: "Country updated successfully:",
                country: country,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Country update failed:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


// Delete country by ID
const deleteCountry = async (req, res, next) => {
    try {
        // Get country ID from request parameters 
        // Delete the country from the database
        const countryId = Number(req.params.id);
        const result = await Country.deleteById(countryId);

        // If deletion was successful, respond with success message
        // Otherwise respond with error message
        if (result.success) {
            res.status(200).json({
                message: `Country ID: ${countryId} deleted successfully.`,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: `Failed to delete country ID: ${countryId}.`,
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


export default {
    getAllCountries,
    getCountryById,
    createNewCountry,
    updateCountry,
    deleteCountry
}