import Event from "../models/Event.js";

// Get all events
const getAllEvents = async (req, res, next) => {
    try {
        // Get events from db
        const [events, _] = await Event.findAll();

        // If events found, map the data to desired format
        // Otherwise return not found 404
        if (events.length > 0) {
            const data = events.map(a => ({
                id: a.id,
                laji: a.laji,
                urheilukategoria: {
                    id: a.urheilukategoria_id,
                    nimi: a.kategoria
                }
            }))

            res.status(200).json({
                count: events.length,
                data: data
            });
        } else {
            res.status(404).json({
                message: "No events found from database."
            })
        }
        // Catch any errors
    } catch (error) {
        next(error);
    }
}


// Get event by ID
const getEventById = async (req, res, next) => {
    try {
        // Get the event ID from the request parameters and find the event in the database
        const eventId = Number(req.params.id);
        const [event, _] = await Event.findById(eventId);

        // If event found, map the data to desired format
        // Response success with event data
        // Otherwise return not found 404
        if (event.length > 0) {
            const data = event.map(a => ({
                id: a.id,
                laji: a.laji,
                urheilukategoria: {
                    id: a.urheilukategoria_id,
                    nimi: a.kategoria
                }
            }));

            res.status(200).json({
                data: data
            });
        } else {
            res.status(404).json({
                message: "Event not found by given id."
            });
        }
    } catch (error) {
        next(error);
    }
}


// Create new event
const createNewEvent = async (req, res, next) => {
    try {
        // Destructure the request body to get event details
        // Create a new Event instance with the provided details
        // Save the new event to the database and get the result
        let { urheilukategoria, laji } = req.body;
        const event = new Event(urheilukategoria, laji);
        const result = await event.save();

        // If creation was successful, respond with success message and event details
        // Otherwise respond with error message
        if (result.success) {
            res.status(201).json({
                message: "Event created successfully:",
                event: event,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Event creation failed:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


// Update event by ID
const updateEvent = async (req, res, next) => {
    try {
        // Destructure the request body and params to get event details
        // Create a new Event instance with the provided details
        // Update the event in the database and get the result
        let { urheilukategoria, laji } = req.body;
        const eventId = Number(req.params.id);
        const event = new Event(urheilukategoria, laji);
        const result = await event.update(eventId);

        // If update was successful, respond with success message and event details
        // Otherwise respond with error message
        if (result.success) {
            res.status(200).json({
                message: `Event ID: ${eventId} updated successfully:`,
                event: event,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Event update failed:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


// Delete event by ID
const deleteEvent = async (req, res, next) => {
    try {
        // Get the event ID from the request parameters
        // Delete the event from the database
        const eventId = Number(req.params.id);
        const result = await Event.deleteById(eventId);

        // If deletion was successful, respond with success message
        // Otherwise respond with error message
        if (result.success) {
            res.status(200).json({
                message: `Event ID: ${eventId} deleted successfully:`,
                dbResult: result
            });
        } else {
            res.status(400).json({
                message: "Event deletion failed:",
                error: result.error,
                dbResult: result
            });
        }
    } catch (error) {
        next(error);
    }
}


export default {
    getAllEvents,
    getEventById,
    createNewEvent,
    updateEvent,
    deleteEvent
}