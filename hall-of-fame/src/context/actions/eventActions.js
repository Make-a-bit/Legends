import {
    ADD_EVENT_SUCCESS, DELETE_EVENT_SUCCESS,
    EDIT_EVENT_SUCCESS, FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_BY_SPORT_SUCCESS,
    HIDE_LOADING, SHOW_ERROR, SHOW_LOADING, SHOW_SUCCESS
} from "../actions/actionTypes.js";

import mainURI from "../../constants/apiEndpoint.js";


// Add event
export const addEvent = (event, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: ADD_EVENT_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t("eventAdded") });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorAddingEvent") });
            }
        } catch (error) {
            console.error("Error adding event:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Fetch events
export const fetchEvents = (t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/events`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: FETCH_EVENTS_SUCCESS, payload: data });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorFetchingEvents") });
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Edit event
export const editEvent = (event, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/events/${event.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: EDIT_EVENT_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t("eventUpdated") });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorUpdatingEvent") });
            }
        } catch (error) {
            console.error("Error updating event:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Delete event
export const deleteEvent = (event, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/events/${event.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                dispatch({ type: DELETE_EVENT_SUCCESS, payload: event.id });
                dispatch({ type: SHOW_SUCCESS, payload: t("eventDeleted") });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorDeletingEvent") });
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};