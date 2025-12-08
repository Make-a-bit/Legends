import {
    ADD_ACHIEVEMENT_SUCCESS, DELETE_ACHIEVEMENT_SUCCESS,
    EDIT_ACHIEVEMENT_SUCCESS, FETCH_ACHIEVEMENTS_SUCCESS,
    HIDE_LOADING, SHOW_ERROR, SHOW_LOADING, SHOW_SUCCESS
} from '../actions/actionTypes.js';

import mainURI from '../../constants/apiEndpoint.js';


// Add achievement
export const addAchievement = (achievement, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/achievements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(achievement),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: ADD_ACHIEVEMENT_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t('achievementAdded') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorAddingAchievement') });
            }
        } catch (error) {
            console.error('Error adding achievement:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Fetch achievements
// If member is provided, fetch achievements for that member only
export const fetchAchievements = (t, member) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            let response; 

            if (member) {
                response = await fetch(`${mainURI}/achievements/${member.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await fetch(`${mainURI}/achievements`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: FETCH_ACHIEVEMENTS_SUCCESS, payload: data });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorFetchingAchievements') });
            }

        } catch (error) {
            console.error('Error fetching achievements:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
}


// Edit achievement
export const editAchievement = (id, achievement, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/achievements/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(achievement),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: EDIT_ACHIEVEMENT_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t('achievementUpdated') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorUpdatingAchievement') });
            }
        } catch (error) {
            console.error('Error updating achievement:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Delete achievement
export const deleteAchievement = (achievement, t) => {
    console.log(achievement)
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/achievements/${achievement.saavutus_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                dispatch({ type: DELETE_ACHIEVEMENT_SUCCESS, payload: achievement.id });
                dispatch({ type: SHOW_SUCCESS, payload: t('achievementDeleted') });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t('errorDeletingAchievement') });
            }
        } catch (error) {
            console.error('Error deleting achievement:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};