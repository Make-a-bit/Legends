import {
    ADD_ATHLETE_SUCCESS,
    DELETE_ATHLETE_SUCCESS,
    EDIT_ATHLETE_SUCCESS,
    FETCH_ATHLETES_SUCCESS
} from "../actions/actionTypes.js";

const athleteReducer = (state = [], action = {}) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_ATHLETE_SUCCESS:
            return [payload, ...state];

        case DELETE_ATHLETE_SUCCESS:
            return state.filter((athlete) => athlete.id !== payload);

        case EDIT_ATHLETE_SUCCESS:
            if (!payload || typeof payload !== "object")
                return state;

            return state.map((athlete) =>
                athlete.id === payload.id ? { ...athlete, ...payload } : athlete
            );

        case FETCH_ATHLETES_SUCCESS:
            return Array.isArray(payload.data) ? payload.data : payload;
  
        default:
            return state;
    }
};

export default athleteReducer;