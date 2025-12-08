import {
    ADD_SPORT_SUCCESS, DELETE_SPORT_SUCCESS,
    EDIT_SPORT_SUCCESS, FETCH_SPORTS_SUCCESS,
    HIDE_LOADING, SHOW_ERROR, SHOW_LOADING, SHOW_SUCCESS
} from "../actions/actionTypes.js";

import mainURI from '../../constants/apiEndpoint.js';


// Add sport
export const addSport = (sport, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/sports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sport),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: ADD_SPORT_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t('sportAdded') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorAddingSport') });
            }
        } catch (error) {
            console.error('Error adding sport:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Fetch sports
export const fetchSports = (t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/sports`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: FETCH_SPORTS_SUCCESS, payload: data });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorFetchingSports') });
            }
        } catch (error) {
            console.error('Error fetching sports:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Edit sport
export const editSport = (sport, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/sports/${sport.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sport),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: EDIT_SPORT_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t('sportUpdated') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorUpdatingSport') });
            }
        } catch (error) {
            console.error('Error editing sport:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Delete sport
export const deleteSport = (sport, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/sports/${sport.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                dispatch({ type: DELETE_SPORT_SUCCESS, payload: sport.id });
                dispatch({ type: SHOW_SUCCESS, payload: t('sportDeleted') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorDeletingSport') });
            }
        } catch (error) {
            console.error('Error deleting sport:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};