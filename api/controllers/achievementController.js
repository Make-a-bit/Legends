import Achievement from "../models/Achievement.js";


// Get all achievements from database
const getAllAchievements = async (req, res, next) => {
    try {
        const [achievements, _] = await Achievement.findAll();

        // If achievements are found, map achievements to desired response format
        // Respond success with data
        // Otherwise respond 404 not found
        if (achievements.length > 0) {
            const data = achievements.map(a => ({
                saavutus_id: a.saavutus_id,
                urheilija: {
                    id: a.urheilija_id,
                    etunimi: a.etunimi,
                    sukunimi: a.sukunimi,
                    kutsumanimi: a.kutsumanimi,
                    syntymavuosi: a.syntymavuosi,
                    paino: a.paino,
                    info: a.info,
                    urheilukategoria: {
                        id: a.urheilijan_urheilukategoria_id,
                        kategoria: a.urheilijan_urheilukategoria
                    },
                    maa: {
                        id: a.urheilija_maa_id,
                        nimi: a.urheilijan_maa,
                        lippu: a.urheilija_lippu_url
                    },
                    kuva: a.kuva_url,
                },
                kilpailu: {
                    id: a.kisa_id,
                    kilpailukategoria: {
                        id: a.kisatyyppi_id,
                        nimi: a.kisa_kategoria
                    },
                    kilpailutapahtuma: {
                        id: a.kisatyyppi_id,
                        nimi: a.kisa_tapahtuma,
                    },
                    vuosi: a.vuosi,
                    kaupunki: a.kaupunki,
                    maa: {
                        id: a.kisamaa_id,
                        nimi: a.kisa_maa,
                        lippu: a.kisa_lippu_url
                    },
                },
                saavutus: {
                    id: a.saavutus_id,
                    saavutus: a.saavutus,
                    laji: {
                        id: a.laji_id,
                        laji: a.laji,
                    },
                    tulos: a.tulos,
                    lisatiedot: a.lisatieto
                },
            }));

            res.status(200).json({
                count: achievements.length,
                data
            });
        } else {
            res.status(404).json({
                message: "No achievements found."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Get achievement by ID from database
const getAchievementById = async (req, res, next) => {
    try {
        // Get achievement ID from request parameters
        // Get achievement from database
        let athleteId = Number(req.params.id);
        let [achievement, _] = await Achievement.findByAthleteId(athleteId);

        // If achievement is found, map achievement to desired response format
        // Respond success with data
        // Otherwise respond 404 not found
        if (achievement.length > 0) {
            const data = achievement.map(a => ({
                saavutus_id: a.saavutus_id,
                urheilija: {
                    id: a.urheilija_id,
                    etunimi: a.etunimi,
                    sukunimi: a.sukunimi,
                    kutsumanimi: a.kutsumanimi,
                    syntymavuosi: a.syntymavuosi,
                    paino: a.paino,
                    info: a.info,
                    urheilukategoria: {
                        id: a.urheilijan_urheilukategoria_id,
                        kategoria: a.urheilijan_urheilukategoria
                    },
                    maa: {
                        id: a.urheilija_maa_id,
                        nimi: a.urheilijan_maa,
                        lippu: a.urheilija_lippu_url
                    },
                    kuva: a.kuva_url,
                },
                kilpailu: {
                    id: a.kisa_id,
                    kilpailukategoria: {
                        id: a.kisatyyppi_id,
                        nimi: a.kisa_kategoria
                    },
                    kilpailutapahtuma: {
                        id: a.kisatyyppi_id,
                        nimi: a.kisa_tapahtuma,
                    },
                    vuosi: a.vuosi,
                    kaupunki: a.kaupunki,
                    maa: {
                        id: a.kisamaa_id,
                        nimi: a.kisa_maa,
                        lippu: a.kisa_lippu_url
                    },
                },
                saavutus: {
                    id: a.saavutusluokka_id,
                    saavutus: a.saavutus,
                    laji: {
                        id: a.laji_id,
                        laji: a.laji,
                    },
                    tulos: a.tulos,
                    lisatiedot: a.lisatieto
                },
            }));

            res.status(200).json({
                data
            });
        } else {
            res.status(404).json({
                message: "Achievement not found."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Create new achievement into database
const createNewAchievement = async (req, res, next) => {
    try {
        // Get achievement data from request body
        let { kisa_id, laji_id, urheilija_id, saavutusluokka_id, tulos, lisatieto } = req.body;

        // Create new achievement instance
        const achievement = new Achievement(
            kisa_id,
            laji_id,
            urheilija_id,
            saavutusluokka_id,
            tulos,
            lisatieto
        );

        // Save achievement to database
        const result = await achievement.save();

        // If save was successful, respond with success and new achievement ID
        // Otherwise respond with error message
        if (result.success) {
            res.status(201).json({
                message: "Achievement created successfully:",
                achievement: achievement,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Failed to create achievement:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


// Update achievement by ID in database
const updateAchievement = async (req, res, next) => {
    try {
        // Get achievement ID from request parameters and data from request body
        const achievementId = Number(req.params.id);
        let { kisa_id, laji_id, urheilija_id, saavutusluokka_id, tulos, lisatieto } = req.body;

        // Create achievement instance with data to be updated
        const achievement = new Achievement(
            kisa_id,
            laji_id,
            urheilija_id,
            saavutusluokka_id,
            tulos,
            lisatieto
        );

        // Update achievement in database and get results
        const result = await achievement.update(achievementId);

        // If update was successful, respond with success message
        // Otherwise respond with error message
        if (result.success) {
            res.status(200).json({
                message: "Achievement updated successfully:",
                achievement: achievement,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Failed to update achievement:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


// Delete achievement by ID from database
const deleteAchievement = async (req, res, next) => {
    try {
        // Get achievement ID from request parameters
        // Delete achievement from database and get results
        const achievementId = Number(req.params.id);
        const result = await Achievement.deleteById(achievementId);

        // If delete was successful, respond with success message
        // Otherwise respond with error message
        if (result.success) {
            res.status(200).json({
                message: "Achievement deleted successfully:",
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Failed to delete achievement:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


export default {
    getAllAchievements,
    getAchievementById,
    createNewAchievement,
    updateAchievement, 
    deleteAchievement
}