import {
    ADD_COMPETITION_SUCCESS, DELETE_COMPETITION_SUCCESS,
    EDIT_COMPETITION_SUCCESS, FETCH_COMPETITIONS_SUCCESS,
    HIDE_LOADING, SHOW_ERROR, SHOW_LOADING, SHOW_SUCCESS
} from "../actions/actionTypes.js"

import mainURI from "../../constants/apiEndpoint.js"


// Add competition
export const addCompetition = (competition, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/competitions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(competition),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: ADD_COMPETITION_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t("competitionAdded") });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorAddingCompetition") });
            }
        } catch (error) {
            console.error("Error adding competition:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Fetch competitions
export const fetchCompetitions = (t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/competitions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: FETCH_COMPETITIONS_SUCCESS, payload: data });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorFetchingCompetitions") });
            }
        } catch (error) {
            console.error("Error fetching competitions:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Edit competition
export const editCompetition = (competition, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/competitions/${competition.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(competition),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: EDIT_COMPETITION_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t("competitionUpdated") });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorUpdatingCompetition") });
            }
        } catch (error) {
            console.error("Error updating competition:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Delete competition
export const deleteCompetition = (competition, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/competitions/${competition.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                dispatch({ type: DELETE_COMPETITION_SUCCESS, payload: competition.id });
                dispatch({ type: SHOW_SUCCESS, payload: t("competitionDeleted") });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorDeletingCompetition") });
            }
        } catch (error) {
            console.error("Error deleting competition:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};