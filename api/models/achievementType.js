import db from "../config/db.js";

export default class AchievementType {
    constructor(saavutusluokka) {
        this.saavutusluokka = saavutusluokka
    }


    // Save new achievement type to database
    async save() {
        let connection;

        // Parameters for the stored procedure
        const params = [this.saavutusluokka];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL lisaa_saavutusluokka(?, @styyppi_id)',
                params
            );

            // Retrieve the OUT parameter (created Id)
            const [rows] = await connection.query('SELECT @styyppi_id AS id');
            const achievementTypeId = rows[0]?.id;

            // Handle error: transaction failed
            if (achievementTypeId === -1) {
                return {
                    success: false,
                    error: 'Achievement type creation failed.'
                }
            }

            // Return success with the new id
            return {
                success: true,
                id: achievementTypeId
            }
        } catch (error) {
            // Catch errors
            return {
                success: false,
                error: error.message
            };
        } finally {
            // Finally, release the connection back to the pool
            if (connection) connection.release();
        }
    }


    // Update achievement type by ID
    async update(achievementTypeId) {
        let connection;

        // Parameters for the stored procedure
        const params = [
            achievementTypeId,
            this.saavutusluokka
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL paivita_saavutusluokka(?, ?, @affected_rows)',
                params
            );

            // Retrieve the OUT parameter (affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    error: 'Achievement type update failed.'
                }
            }

            // Handle error: achievement type not found by given id
            if (affectedRows === 0) {
                return {
                    success: false,
                    error: 'Achievement type not found by given id.'
                }
            }

            // Return success
            return {
                success: true
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


    // Delete achievement type by ID
    static async deleteById(id) {
        let connection;

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL poista_saavutusluokka(?, @affected_rows)',
                [id]
            );

            // Retrieve the OUT parameter (affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    error: 'Achievement type deletion failed.'
                }
            }

            // Handle error: achievement type not found by given id
            if (affectedRows === 0) {
                return {
                    success: false,
                    error: 'Achievement type not found by given id.'
                }
            }

            // Return success
            return {
                success: true
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


    // Get all achievement types from database
    static findAll() {
        return db.execute("SELECT * from nayta_saavutustyypit");
    }


    // Get achievement type by ID
    static findById(id) {
        return db.execute("SELECT * from nayta_saavutustyypit WHERE id = ?", [id]);
    }
}