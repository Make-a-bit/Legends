import Competition from "../models/Competition.js"; 

// Get all competitions
const getAllCompetitions = async (req, res, next) => {
    try {
        // Fetch all competitions from the database
        const [competitions, _] = await Competition.findAll();

        // If competitions are found map results to desired response format
        // Respond success with competitions data as JSON
        // Otherwise respond with 404 not found
        if (competitions) {
            const data = competitions.map(c => ({
                id: c.id,
                nimi: c.kisa,
                kisatyyppi: {
                    id: c.kisatyyppi_id,
                    nimi: c.kisatyyppi
                },
                vuosi: c.vuosi,
                kaupunki: c.kaupunki,
                maa: {
                    id: c.maa_id,
                    nimi: c.maa,
                    lippu_url: c.lippu_url
                },
            }))
            res.status(200).json({
                count: competitions.length,
                data: data
            });
        } else {
            res.status(404).json({
                message: "No competitions found."
            });
        }
    } catch (error) {
        next(error);
    }
};


// Get competition by ID
const getCompetitionById = async (req, res, next) => {
    try {
        // Fetch competition by ID from the database
        let competitionId = Number(req.params.id);
        let [competition, _] = await Competition.findById(competitionId);

        // If competition is found map result to desired response format
        // Respond success with competition data as JSON
        // Otherwise respond with 404 not found
        if (competition) {
            const data = competition.map(c => ({
                id: c.id,
                nimi: c.kisa,
                kisatyyppi: {
                    id: c.kisatyyppi_id,
                    nimi: c.kisatyyppi
                },
                vuosi: c.vuosi,
                kaupunki: c.kaupunki,
                maa: {
                    id: c.maa_id,
                    nimi: c.maa,
                    lippu_url: c.lippu_url
                },
            }))
            res.status(200).json({
                data
            });
        } else {
            res.status(404).json({
                message: "Competition not found."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Create new competition
const createNewCompetition = async (req, res, next) => {
    try {
        // Destructure the request body to get competition details
        let { kisatyyppi, maa, nimi, vuosi, kaupunki } = req.body;

        // Create a new Competition instance with the provided details
        const competition = new Competition(
            kisatyyppi,
            maa, 
            nimi,
            vuosi, 
            kaupunki
        );

        // Save the competition to the database
        const result = await competition.saveCompetition();

        // If creation was successful, respond success with the new competition ID
        // Otherwise respond with error message
        if (result.success) {
            res.status(201).json({
                message: "New competition created successfully:",
                competition: competition,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Failed to create new competition:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


// Update existing competition
const updateCompetition = async (req, res, next) => {
    const competitionId = Number(req.params.id);
    try {
        // Destructure the request body to get updated competition details
        let { kisatyyppi, maa, nimi, vuosi, kaupunki } = req.body; 

        // Create a Competition instance with the updated details
        const competition = new Competition(
            kisatyyppi,
            maa,
            nimi,
            vuosi,
            kaupunki
        );

        // Update the competition in the database
        const result = await competition.updateCompetition(competitionId);

        // console.log(result);

        if (result.success) {
            // Respond with success message and updated competition details
            res.status(200).json({
                message: "Competition updated successfully:",
                competition: competition,
                dbResult: result
            });
        } else {
            // Respond with error message if update failed
            res.status(400).json({
                message: "Competition update failed:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


// Delete competition by ID
const deleteCompetition = async (req, res, next) => {
    try {
        // Get competition ID from request parameters and proceed to delete from db
        const competitionId = Number(req.params.id);
        const result = await Competition.deleteCompetition(competitionId);

        // If deletion was successful, respond with success message
        // Otherwise respond with error message
        if (result.success) {
            res.status(200).json({
                message: "Competition deleted successfully:",
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Competition deletion failed:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


export default {
    getAllCompetitions,
    getCompetitionById,
    createNewCompetition,
    updateCompetition,
    deleteCompetition
}