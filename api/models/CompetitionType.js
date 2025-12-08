import db from "../config/db.js";

export default class CompetitionType {
    constructor(kisatyyppi, ranking_value) {
        this.kisatyyppi = kisatyyppi;
        this.ranking_value = ranking_value;
    }


    // Save new competition type to database
    async save() {
        let connection;

        // Parameters for the stored procedure
        const params = [
            this.kisatyyppi,
            this.ranking_value
        ];

        // Try to get a connection from the pool and proceed with the operation
        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL lisaa_kisatyyppi(?, ?, @kisatyyppi_id)',
                params
            );

            // Retrieve the OUT parameter (created competitionTypeId)
            const [rows] = await connection.query('SELECT @kisatyyppi_id AS id');
            const competitionTypeId = rows[0]?.id;

            // Handle error: transaction failed
            if (competitionTypeId === -1) {
                return {
                    success: false,
                    error: 'Competition type creation failed.'
                }
            }

            // Return success with the new competition type ID
            return {
                success: true,
                id: competitionTypeId
            };
        } catch (error) {
            // Catch any errors
            return {
                success: false,
                error: error.message
            };
            // Finally, release the connection back to the pool
        } finally {
            if (connection) connection.release();
        }
    }


    // Update competition type by ID
    async update(competitionTypeId) {
        let connection;

        const params = [
            competitionTypeId,
            this.kisatyyppi,
            this.ranking_value
        ]

        try {
            connection = await db.getConnection();

            const [result] = await connection.query(
                'CALL paivita_kisatyyppi(?, ?, ?, @affected_rows)',
                params
            );

            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    message: 'Competition type update failed.'
                }
            }

            // If no rows were affected, the competition type ID may not exist
            if (affectedRows === 0) {
                return {
                    success: false,
                    message: 'Competition type ID may not exist.'
                };
            }

            // Return success
            return {
                success: true,
            }
        } catch (error) {
            // Catch any errors
            return {
                success: false,
                error: error.message
            };
        } finally {
            // Finally, release the connection back to the pool
            if (connection) connection.release();
        }
    }


    // Delete a competition type by ID
    static async deleteById(id) {
        let connection;

        try {
            connection = await db.getConnection();

            // Call the stored procedure to delete the competition type
            const [results] = await connection.query(
                'CALL poista_kisatyyppi(?, @affected_rows)',
                [id]
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    message: 'Competition type deletion failed.'
                }
            }

            // If no rows were affected, the competition type ID may not exist
            if (affectedRows === 0) {
                return {
                    success: false,
                    message: 'Competition type ID may not exist.'
                };
            }

            // Return success
            return {
                success: true,
            };
        } catch (error) {
            // Catch any errors
            return {
                success: false,
                error: error.message
            };
        } finally {
            // Finally, release the connection back to the pool
            if (connection) connection.release();
        }
    }


    // Fetch all competition types from the database
    static findAll() {
        return db.execute("SELECT * FROM nayta_kisatyypit");
    }


    // Fetch a competition type by ID
    static findById(id) {
        return db.execute("SELECT * FROM nayta_kisatyypit WHERE id = ?", [id]);
    }
}