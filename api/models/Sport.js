import db from "../config/db.js"; 

export default class Sport {
    constructor(kategoria) {
        this.kategoria = kategoria;
    }


    // Save new sport to database
    async save() {
        let connection;

        // Parameters for the stored procedure
        const params = [
            this.kategoria
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL lisaa_urheilukategoria(?, @kategoria_id)',
                params
            );

            // Retrieve the OUT parameter (created sportId)
            const [rows] = await connection.query('SELECT @kategoria_id AS id');
            const sportId = rows[0]?.id;

            // Handle error: transaction failed
            if (sportId === -1) {
                return {
                    success: false,
                    error: 'Sport creation failed.'
                }
            }

            // Return success with the new sport ID
            return {
                success: true,
                id: sportId
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


    // Update sport by ID
    async update(sportId) {
        let connection;

        // Parameters for the stored procedure
        const params = [
            sportId,
            this.kategoria
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL paivita_urheilukategoria(?, ?, @affected_rows)',
                params
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    error: 'Sport update failed.'
                }
            }

            // Handle case: no rows were affected, possibly invalid sport ID
            if (affectedRows === 0) {
                return {
                    success: false,
                    error: 'No sport found with the given ID.'
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


    // Delete sport by ID
    static async deleteById(id) {
        let connection;

        try {
            connection = await db.getConnection();

            // Call the stored procedure to delete the sport
            const [results] = await connection.query(
                'CALL poista_urheilukategoria(?, @affected_rows)',
                [id]
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    error: 'Sport deletion failed.'
                }
            }

            // If no rows were affected, the sport ID may not exist
            if (affectedRows === 0) {
                return {
                    success: false,
                    message: 'No sport found with the given ID.'
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


    // Find all sports
    static findAll() {
        return db.execute("SELECT * from nayta_urheilukategoriat"); 
    }


    // Find sport by ID
    static findById(id) {
        return db.execute("SELECT * from nayta_urheilukategoriat WHERE id = ?", [id]);
    }
}