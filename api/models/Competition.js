import db from "../config/db.js";

export default class Competition {
    constructor(kisatyyppi_id, maa_id, kisa, vuosi, kaupunki) {
        this.kisatyyppi_id = kisatyyppi_id;
        this.maa_id = maa_id;
        this.kisa = kisa;
        this.vuosi = vuosi;
        this.kaupunki = kaupunki;
    }

    // Save new competition to database
    async saveCompetition() {
        let connection;

        // Parameters for the stored procedure
        const params = [
            this.kisatyyppi_id,
            this.maa_id,
            this.kisa,
            this.vuosi,
            this.kaupunki
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            await connection.query(
                'CALL lisaa_kisa(?, ?, ?, ?, ?, @kisa_id)',
                params
            );

            // Retrieve the OUT parameter (created competitionId)
            const [rows] = await connection.query('SELECT @kisa_id AS id');
            const kisaId = rows[0]?.id;

            // Handle error: transaction failed
            if (kisaId === -1) {
                return {
                    success: false,
                    message: 'Competition creation failed.'
                }
            }

            // Return success with the new competition ID
            return {
                success: true,
                id: kisaId
            };
        } catch (error) {
            // Return error
            return {
                success: false,
                message: error.message
            };
        } finally {
            // Release the connection back to the pool
            if (connection) connection.release();
        }
    }


    // Update existing competition in the database
    async updateCompetition(competitionId) {
        let connection;

        // Parameters for the stored procedure
        const params = [
            competitionId,
            this.kisatyyppi_id,
            this.maa_id,
            this.kisa,
            this.vuosi,
            this.kaupunki,
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL paivita_kisa(?, ?, ?, ?, ?, ?, @affected_rows)',
                params
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS p_affected_rows');
            const affectedRows = rows[0]?.p_affected_rows;

            // Handle errors
            if (affectedRows === -1) {
                return {
                    success: false,
                    message: 'Competition update failed.'
                }
            }

            // If no rows were affected, the competition was not found
            if (affectedRows === 0) {
                return {
                    success: false,
                    message: 'Competition not found by given Id'
                };
            }

            // Return success
            return {
                success: true,
            };
        } catch (error) {
            // Return error
            return {
                success: false,
                message: error.message
            };
        } finally {
            // Release the connection back to the pool
            if (connection) connection.release();
        }
    }


    // Delete competition by ID
    static async deleteCompetition(id) {
        let connection;

        try {
            connection = await db.getConnection();

            // Call the stored procedure to delete the competition
            const [results] = await connection.query(
                'CALL poista_kisa(?, @affected_rows)',
                [id]
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle errors
            if (affectedRows === -1) {
                return {
                    success: false,
                    message: 'Competition deletion failed.'
                }
            }

            // If no rows were affected, the competition was not found
            if (affectedRows === 0) {
                return {
                    success: false,
                    message: 'Competition not found by given Id.'
                };
            }

            // Return success
            return {
                success: true,
            };
        } catch (error) {
            // Return error
            return {
                success: false,
                message: error.message
            };
        } finally {
            // Release the connection back to the pool
            if (connection) connection.release();
        }
    }


    // Fetch all competitions from the database
    static findAll() {
        return db.execute("SELECT * FROM nayta_kisat"); 
    }


    // Fetch competition by ID
    static findById(id) {
        return db.execute("SELECT * FROM nayta_kisat WHERE id = ?", [id]);
    }
}