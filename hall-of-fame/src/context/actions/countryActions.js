import {
    ADD_COUNTRY_SUCCESS, DELETE_COUNTRY_SUCCESS,
    EDIT_COUNTRY_SUCCESS, FETCH_COUNTRIES_SUCCESS,
    HIDE_LOADING, SHOW_ERROR, SHOW_LOADING, SHOW_SUCCESS
} from "../actions/actionTypes.js"

import mainURI from "../../constants/apiEndpoint.js";


// Add country
export const addCountry = (country, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/countries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(country),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: ADD_COUNTRY_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t("countryAdded") });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorAddingCountry") });
            }
        } catch (error) {
            console.error("Error adding country:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Fetch countries
export const fetchCountries = (t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/countries`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: FETCH_COUNTRIES_SUCCESS, payload: data });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorFetchingCountries") });
            }
        } catch (error) {
            console.error("Error fetching countries:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Edit country
export const editCountry = (apiEndpoint, country, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}${apiEndpoint}/${country.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(country),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: EDIT_COUNTRY_SUCCESS, payload: data });
                dispatch({ type: SHOW_SUCCESS, payload: t("countryEdited") });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorUpdatingCountry") });
            }
        } catch (error) {
            console.error("Error editing country:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};


// Delete country
export const deleteCountry = (country, t) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADING });
        try {
            const response = await fetch(`${mainURI}/countries/${country.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                dispatch({ type: DELETE_COUNTRY_SUCCESS, payload: country.id });
                dispatch({ type: SHOW_SUCCESS, payload: t("countryDeleted") });
            } else {
                dispatch({ type: SHOW_ERROR, payload: t("errorDeletingCountry") });
            }
        } catch (error) {
            console.error("Error deleting country:", error);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};