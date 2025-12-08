import {
    ADD_COMPETITION_TYPE_SUCCESS, DELETE_COMPETITION_TYPE_SUCCESS,
    EDIT_COMPETITION_TYPE_SUCCESS, FETCH_COMPETITION_TYPES_SUCCESS,
    HIDE_LOADING, SHOW_ERROR, SHOW_LOADING, SHOW_SUCCESS
} from "../actions/actionTypes.js";

import mainURI from '../../constants/apiEndpoint.js';


// Add competition type
export const addCompetitionType = (competitionType, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/competitionTypes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(competitionType),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: ADD_COMPETITION_TYPE_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t('competitionTypeAdded') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorAddingCompetitionType') });
            }
        } catch (error) {
            console.error('Error adding competition type:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Fetch competition types
export const fetchCompetitionTypes = (t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/competitionTypes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: FETCH_COMPETITION_TYPES_SUCCESS, payload: data });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorFetchingCompetitionTypes') });
            }
        } catch (error) {
            console.error('Error fetching competition types:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Edit competition type
export const editCompetitionType = (competitionType, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/competitionTypes/${competitionType.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(competitionType),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: EDIT_COMPETITION_TYPE_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t('competitionTypeUpdated') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorUpdatingCompetitionType') });
            }
        } catch (error) {
            console.error('Error updating competition type:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Delete competition type
export const deleteCompetitionType = (competitionType, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/competitionTypes/${competitionType.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                dispatch({ type: DELETE_COMPETITION_TYPE_SUCCESS, payload: competitionType.id });
                dispatch({ type: SHOW_SUCCESS, payload: t('competitionTypeDeleted') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorDeletingCompetitionType') });
            }
        } catch (error) {
            console.error('Error deleting competition type:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};