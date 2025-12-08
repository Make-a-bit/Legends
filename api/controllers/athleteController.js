import Athlete from "../models/Athlete.js";

// Get all athletes
const getAllAthletes = async (req, res, next) => {
    try {
        // Fetch all athletes from the database
        const [athletes, _] = await Athlete.findAll();

        // If athletes are found, map them to the desired response format
        // Respond with success and the list of athletes
        // Otherwise respond with a 404 error
        if (athletes.length > 0) {
            const data = athletes.map(a => ({
                id: a.id,
                etunimi: a.etunimi,
                sukunimi: a.sukunimi,
                kutsumanimi: a.kutsumanimi,
                syntymavuosi: a.syntymavuosi,
                ika: a.ika,
                paino: a.paino,
                info: a.info,
                urheilukategoria: {
                    urheilukategoria_id: a.urheilukategoria_id,
                    urheilukategoria_nimi: a.kategoria,
                },
                maa: {
                    id: a.maa_id,
                    nimi: a.maa,
                    lippu_url: a.lippu_url
                },
                kuva_url: a.kuva_url
            }));

            res.status(200).json({
                count: athletes.length,
                data: data
            });
        } else {
            res.status(404).json({
                message: "No athletes found."
            });
        }
    } catch (error) {
        next(error);
    }
};


// Get athlete by ID
const getAthleteById = async (req, res, next) => {
    try {
        // Get athlete ID from request parameters
        // Fetch athlete from db
        let athleteId = Number(req.params.id);
        let [athlete, _] = await Athlete.findById(athleteId);

        // If athlete is found, map to desired response format
        // Respond with success and athlete details
        // Otherwise respond with a 404 error
        if (athlete.length > 0) {
            const data = athlete.map(a => ({
                id: a.id,
                etunimi: a.etunimi,
                sukunimi: a.sukunimi,
                kutsumanimi: a.kutsumanimi,
                syntymavuosi: a.syntymavuosi,
                ika: a.ika,
                paino: a.paino,
                info: a.info,
                urheilukategoria: {
                    urheilukategoria_id: a.urheilukategoria_id,
                    urheilukategoria_nimi: a.kategoria,
                },
                maa: {
                    id: a.maa_id,
                    nimi: a.maa,
                    lippu_url: a.lippu_url
                },
                kuva_url: a.kuva_url
            }));

            res.status(200).json({
                data: data
            });
        } else {
            res.status(404).json({
                message: "Athlete not found."
            });
        }
    } catch (error) {
        next(error);
    }
};


// Create new athlete
const createNewAthlete = async (req, res, next) => {
    try {
        // Destructure the request body to get athlete details
        let { urheilukategoria_id, maa_id, etunimi, sukunimi, kutsumanimi, syntymavuosi, paino, kuva_url, info } = req.body;

        // Create a new Athlete instance with the provided details
        const athlete = new Athlete(
            urheilukategoria_id,
            maa_id,
            etunimi,
            sukunimi,
            kutsumanimi,
            syntymavuosi,
            paino,
            kuva_url,
            info
        );

        // Save the new athlete to the database and get the result
        const result = await athlete.save();

        // If athlete is created successfully, respond with success message and athlete details
        // Otherwise respond with error message
        if (result.success) {
            res.status(201).json({
                message: "Athlete created:",
                athlete: athlete,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Athlete creation failed:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        // Catch any errors
        next(error);
    }
};


// Update existing athlete
const updateAthlete = async (req, res, next) => {
    try {
        // Get athlete ID from request parameters
        // Destructure the request body to get updated athlete details
        const athleteId = Number(req.params.id);
        let { urheilukategoria_id, maa_id, etunimi, sukunimi, kutsumanimi, syntymavuosi, paino, kuva_url, info } = req.body;

        // Create a new Athlete instance with the updated details
        const athlete = new Athlete(
            urheilukategoria_id,
            maa_id,
            etunimi,
            sukunimi,
            kutsumanimi,
            syntymavuosi,
            paino,
            kuva_url,
            info,
        );

        // Update the athlete in the database and get the result
        const result = await athlete.update(athleteId);

        // If update is successful, respond with success message and updated athlete details
        // Otherwise respond with error message
        if (result.success) {
            res.status(200).json({
                message: "Athlete updated:",
                athlete: athlete,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Athlete update failed:",
                error: result.error
            });
        }
    } catch (error) {
        // Catch any errors
        next(error);
    }
}


// Delete athlete by ID
const deleteAthlete = async (req, res, next) => {
    try {
        // Get athlete ID from request parameters
        // Delete athlete from db and get the result
        const athleteId = Number(req.params.id);
        const result = await Athlete.deleteById(athleteId);

        // If deletion is successful, respond with success message
        // Otherwise respond with error message
        if (result.success) {
            res.status(200).json({
                message: "Athlete deleted successfully:",
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Athlete deletion failed:",
                error: result.error
            });
        }
    } catch (error) {
        next(error);
    }
}


export default {
    getAllAthletes,
    getAthleteById,
    createNewAthlete,
    updateAthlete,
    deleteAthlete
};