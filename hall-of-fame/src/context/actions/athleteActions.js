import {
    ADD_ATHLETE_SUCCESS, DELETE_ATHLETE_SUCCESS,
    EDIT_ATHLETE_SUCCESS, FETCH_ATHLETES_SUCCESS,
    HIDE_LOADING, SHOW_ERROR, SHOW_LOADING, SHOW_SUCCESS
} from "./actionTypes.js"

import mainURI from '../../constants/apiEndpoint.js';


// Add athlete
export const addAthlete = (athlete, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/athletes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(athlete),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: ADD_ATHLETE_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t('athleteAdded') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorAddingAthlete') });
            }
        } catch (error) {
            console.error('Error adding athlete:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Fetch athletes
export const fetchAthletes = (t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/athletes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: FETCH_ATHLETES_SUCCESS, payload: data });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorFetchingAthletes') });
            }
        } catch (error) {
            console.error('Error fetching athletes:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
}


// Edit athlete
export const editAthlete = (athlete, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/athletes/${athlete.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(athlete),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: EDIT_ATHLETE_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t('athleteUpdated') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorUpdatingAthlete') });
            }
        } catch (error) {
            console.error('Error editing athlete:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Delete athlete
export const deleteAthlete = (athlete, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/athletes/${athlete.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                dispatch({ type: DELETE_ATHLETE_SUCCESS, payload: athlete.id });
                dispatch({ type: SHOW_SUCCESS, payload: t('athleteDeleted') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorDeletingAthlete') });
            }
        } catch (error) {
            console.error('Error deleting athlete:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};