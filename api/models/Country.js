import db from "../config/db.js";

export default class Country {
    constructor(maa, lippu_url) {
        this.maa = maa;
        this.lippu_url = lippu_url;
    }


    // Save new country to database
    async save() {
        let connection;

        // Parameters for the stored procedure
        const params = [
            this.maa,
            this.lippu_url
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL lisaa_maa(?, ?, @maa_id)',
                params
            );

            // Retrieve the OUT parameter (created countryId)
            const [rows] = await connection.query('SELECT @maa_id AS id');
            const countryId = rows[0]?.id;

            // Handle error: transaction failed
            if (countryId === -1) {
                return {
                    success: false,
                    error: 'Country creation failed.'
                }
            }

            // Return success with the new country ID
            return {
                success: true,
                id: countryId
            };
        } catch (error) {
            // Catch any errors
            return {
                success: false,
                error: 'Failed to save country.'
            };
        } finally {
            // Finally, release the connection back to the pool
            if (connection) connection.release();
        }
    }


    // Update country by ID
    async update(countryId) {
        let connection;

        // Parameters for the stored procedure
        const params = [
            countryId,
            this.maa,
            this.lippu_url,
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL paivita_maa(?, ?, ?, @affedted_rows)',
                params
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affedted_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    message: 'Country update failed.'
                };
            }

            // Handle case: no rows affected (no country with given ID)
            if (affectedRows === 0) {
                return {
                    success: false,
                    message: 'No country found with the given ID.'
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


    // Delete country by ID
    static async deleteById(id) {
        let connection;

        try {
            connection = await db.getConnection();

            // Call the stored procedure to delete the country
            const [results] = await connection.query(
                'CALL poista_maa(?, @affected_rows)',
                [id]
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    error: 'Country deletion failed.'
                };
            }

            // Handle case: no rows were affected, possibly invalid country ID
            if (affectedRows === 0) {
                return {
                    success: false,
                    error: 'No country found with the given ID.'
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


    // Get all countries from database
    static findAll() {
        return db.execute("SELECT * from nayta_maat"); 
    }


    // Find country by ID
    static findById(id) {
        return db.execute("SELECT * from nayta_maat WHERE id = ?", [id]);
    }
}