import db from "../config/db.js";

export default class Event {
    constructor(urheilukategoria_id, laji) {
        this.urheilukategoria_id = urheilukategoria_id;
        this.laji = laji;
    }


    // Save new event to database
    async save() {
        let connection;

        // Parameters for the stored procedure
        const params = [
            this.urheilukategoria_id,
            this.laji
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL lisaa_laji(?, ?, @laji_id)',
                params
            );

            // Retrieve the OUT parameter (created eventId)
            const [rows] = await connection.query('SELECT @laji_id AS id');
            const eventId = rows[0]?.id;

            // Handle error: transaction failed
            if (eventId === -1) {
                return {
                    success: false,
                    error: 'Event creation failed.'
                }
            }

            // Return success with the new event ID
            return {
                success: true,
                id: eventId
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


    // Update event by ID
    async update(eventId) {
        let connection;

        // Parameters for the stored procedure
        const params = [
            eventId,
            this.urheilukategoria_id,
            this.laji
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL paivita_laji(?, ?, ?, @affected_rows)',
                params
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    error: 'Event update failed.'
                }
            }

            // Check if the update was successful
            if (results.affectedRows === 0) {
                return {
                    success: false,
                    error: 'No event found with the given ID.'
                }
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


    // Delete event by ID
    static async deleteById(id) {
        let connection;

        try {
            connection = await db.getConnection();

            // Call the stored procedure to delete the event
            await connection.query(
                'CALL poista_laji(?, @affected_rows)',
                [id]
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [results] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = results[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    error: 'Event deletion failed.'
                }
            }

            // If no rows were affected, the event ID does not exist
            if (affectedRows === 0) {
                return {
                    success: false,
                    error: 'No event found with the given ID.'
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


    // Find all events
    static findAll() {
        return db.execute("SELECT * from nayta_lajit");
    }


    // Find event by ID
    static findById(id) {
        return db.execute("SELECT * from nayta_lajit WHERE id = ?", [id]);
    }
}