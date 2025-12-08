import {
    ADD_COUNTRY_SUCCESS,
    DELETE_COUNTRY_SUCCESS,
    EDIT_COUNTRY_SUCCESS,
    FETCH_COUNTRIES_SUCCESS
} from "../actions/actionTypes.js"

const countryReducer = (state = [], action = {}) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_COUNTRY_SUCCESS:
            return [payload, ...state];

        case DELETE_COUNTRY_SUCCESS:
            return state.filter(country => country.id !== payload);

        case EDIT_COUNTRY_SUCCESS:
            if (!payload || typeof payload !== "object")
                return state;

            return state.map(country =>
                country.id === payload.id ? { ...country, ...payload } : country
            );

        case FETCH_COUNTRIES_SUCCESS:
            return Array.isArray(payload.data) ? payload.data : payload;

        default:
            return state;
    }
}

export default countryReducer;