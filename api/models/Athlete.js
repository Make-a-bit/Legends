import db from "../config/db.js";

export default class Athlete {
    constructor(urheilukategoria_id, maa_id, etunimi, sukunimi, kutsumanimi, syntymavuosi, paino, kuva_url, info) {
        this.urheilukategoria_id = urheilukategoria_id;
        this.maa_id = maa_id;
        this.etunimi = etunimi;
        this.sukunimi = sukunimi;
        this.kutsumanimi = kutsumanimi;
        this.syntymavuosi = syntymavuosi;
        this.paino = paino;
        this.kuva_url = kuva_url;
        this.info = info;
    }


    // Save new athlete to database
    async save() {
        let connection;

        // Parameters for the stored procedure
        const params = [
            this.urheilukategoria_id,
            this.maa_id,
            this.etunimi,
            this.sukunimi,
            this.kutsumanimi,
            this.syntymavuosi,
            this.paino,
            this.kuva_url,
            this.info
        ];

        // Try to get a connection from the pool and proceed with the operation
        try {
            connection = await db.getConnection();

            // Call the stored procedure
            const [results] = await connection.query(
                'CALL lisaa_urheilija(?, ?, ?, ?, ?, ?, ?, ?, ?, @urheilija_id)',
                params
            );

            // Retrieve the OUT parameter (created athleteId)
            const [rows] = await connection.query('SELECT @urheilija_id AS id');
            const athleteId = rows[0]?.id;

            // Handle error: transaction failed
            if (athleteId === -1) {
                return {
                    success: false,
                    error: 'Athlete creation failed.'
                }
            }

            // Return success with the new athlete ID
            return {
                success: true,
                id: athleteId
            };
        } catch (error) {
            // Return error
            return {
                success: false,
                error: error.message
            };
        } finally {
            if (connection) connection.release();
        }
    }


    // Update existing athlete in the database
    async update(athleteId) {
        let connection;

        // Parameters for the stored procedure
        const params = [
            athleteId,
            this.urheilukategoria_id,
            this.maa_id,
            this.etunimi,
            this.sukunimi,
            this.kutsumanimi,
            this.syntymavuosi,
            this.paino,
            this.kuva_url,
            this.info
        ];

        try {
            connection = await db.getConnection();

            // Call the stored procedure to update the athlete
            const [results] = await connection.query(
                'CALL paivita_urheilija(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @affected_rows)',
                params
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    error: 'Athlete update failed.'
                }
            }

            // If no rows were affected, the athlete ID may not exist
            if (affectedRows === 0) {
                return {
                    success: false,
                    error: 'Athlete ID may not exist.'
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
                error: error.message
            };
        } finally {
            // Release the connection back to the pool
            if (connection) connection.release();
        }
    }


    // Delete athlete by ID
    static async deleteById(id) {
        let connection;

        try {
            connection = await db.getConnection();

            // Call the stored procedure to delete the athlete including achievements
            const [results] = await connection.query(
                'CALL poista_urheilija_cascade(?, @affected_rows, @deleted_achievements)',
                [id]
            );

            // Retrieve the OUT parameter (number of affected rows)
            const [rows] = await connection.query('SELECT @affected_rows AS affectedRows');
            const affectedRows = rows[0]?.affectedRows;

            // Handle error: transaction failed
            if (affectedRows === -1) {
                return {
                    success: false,
                    error: 'Athlete deletion failed.'
                }
            }

            // If no rows were affected, the athlete ID may not exist
            if (affectedRows === 0) {
                return {
                    success: false,
                    error: 'Athlete ID may not exist.'
                };
            }

            // Return success
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        } finally {
            if (connection) connection.release();
        }
    }


    // Fetch all athletes from the database
    static findAll() {
        return db.execute("SELECT * FROM nayta_urheilijat");
    }

    // Fetch athlete by ID
    static findById(id) {
        return db.execute("SELECT * FROM nayta_urheilijat WHERE id = ?", [id]);
    }
}