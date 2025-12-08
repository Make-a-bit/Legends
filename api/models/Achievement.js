import db from "../config/db.js";

export default class Achievement {
    constructor(kisa_id, laji_id, urheilija_id, saavutusluokka_id, tulos, lisatieto) {
        this.kisa_id = kisa_id;
        this.laji_id = laji_id;
        this.urheilija_id = urheilija_id;
        this.saavutusluokka_id = saavutusluokka_id;
        this.tulos = tulos;
        this.lisatieto = lisatieto;
    }


    // Save new achievement to database
    async save() {
        let connection;

        // Parameters for the stored procedure
        const params = [
            this.kisa_id,
            this.laji_id,
            this.urheilija_id,
            this.saavutusluokka_id,
            this.tulos,
            this.lisatieto
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [result] = await connection.query(
                'CALL lisaa_saavutus(?, ?, ?, ?, ?, ?, @saavutus_id)',
                params
            );

            // Retrieve the OUT parameter (created achievementId)
            const [rows] = await connection.query('SELECT @saavutus_id AS id');
            const achievementId = rows[0]?.id;

            // Handle error: transaction failed
            if (achievementId === -1) {
                return {
                    success: false,
                    error: 'Achievement creation failed.'
                }
            }

            // Return success with the new achievement ID
            return {
                success: true,
                achievementId: achievementId
            };
        } catch (error) {
            // Catch and return any errors
            return {
                success: false,
                error: error.message
            };
        } finally {
            // Release the connection back to the pool
            if (connection) connection.release();
        }
    }


    // Update existing achievement
    async update(achievementId) {
        let connection;

        // Parameters for the stored procedure
        const params = [
            achievementId,
            this.kisa_id,
            this.laji_id,
            this.urheilija_id,
            this.saavutusluokka_id,
            this.tulos,
            this.lisatieto
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [result] = await connection.query(
                'CALL paivita_saavutus(?, ?, ?, ?, ?, ?, ?, @affected_rows)',
                params
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS id');
            const affectedRows = rows[0]?.id;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    error: 'Achievement update failed.'
                }
            }

            // Handle error: achievementId may not exist
            if (affectedRows === 0) {
                return {
                    success: false,
                    error: 'Achievement ID may not exist.'
                };
            }

            // Return success
            return {
                success: true,
            }
        } catch (error) {
            // Catch and return any errors
            return {
                success: false,
                error: error.message
            };
        } finally {
            // Release the connection back to the pool
            if (connection) connection.release();
        }
    }


    // Delete achievement by ID
    static async deleteById(id) {
        let connection;

        try {
            connection = await db.getConnection();

            // Call the stored procedure to delete the achievement
            const [results] = await connection.query(
                'CALL poista_saavutus(?, @affected_rows)',
                [id]
            );

            // console.log(results);

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    error: 'Achievement deletion failed.'
                }
            }

            // Handle error: achievement ID may not exist
            if (affectedRows === 0) {
                return {
                    success: false,
                    error: 'Achievement ID may not exist.'
                };
            }

            // Return success
            return {
                success: true,
            }
        } catch (error) {
            // Catch and return any errors
            return {
                success: false,
                error: error.message
            };
        } finally {
            // Release the connection back to the pool
            if (connection) connection.release();
        }
    }


    // Find all achievements with related details
    static findAll() {
        return db.execute("SELECT * FROM nayta_saavutukset"); 
    }


    // Find achievements by athlete ID
    static findByAthleteId(id) {
        return db.execute("SELECT * FROM nayta_saavutukset WHERE urheilija_id = ?", [id]);
    }
}