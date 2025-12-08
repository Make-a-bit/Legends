import {
    ADD_ACHIEVEMENT_TYPE_SUCCESS, DELETE_ACHIEVEMENT_TYPE_SUCCESS,
    EDIT_ACHIEVEMENT_TYPE_SUCCESS, FETCH_ACHIEVEMENT_TYPES_SUCCESS,
    HIDE_LOADING, SHOW_ERROR, SHOW_LOADING, SHOW_SUCCESS
} from '../actions/actionTypes.js';

import mainURI from '../../constants/apiEndpoint.js';


// Add achievement type
export const addAchievementType = (achievementType, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/achievementTypes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(achievementType),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: ADD_ACHIEVEMENT_TYPE_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t('achievementTypeAdded') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorAddingAchievementType') });
            }
        } catch (error) {
            console.error('Error adding achievement type:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Fetch achievement types
export const fetchAchievementTypes = (t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/achievementTypes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: FETCH_ACHIEVEMENT_TYPES_SUCCESS, payload: data });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorFetchingAchievementTypes') });
            }
        } catch (error) {
            console.error('Error fetching achievement types:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Edit achievement type
export const editAchievementType = (achievementType, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/achievementTypes/${achievementType.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(achievementType),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: EDIT_ACHIEVEMENT_TYPE_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t('achievementTypeUpdated') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorUpdatingAchievementType') });
            }
        } catch (error) {
            console.error('Error updating achievement type:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Delete achievement type
export const deleteAchievementType = (achievementType, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/achievementTypes/${achievementType.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                dispatch({ type: DELETE_ACHIEVEMENT_TYPE_SUCCESS, payload: achievementType.id });
                dispatch({ type: SHOW_SUCCESS, payload: t('achievementTypeDeleted') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorDeletingAchievementType') });
            }
        } catch (error) {
            console.error('Error deleting achievement type:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};