import {
    ADD_SPORT_SUCCESS,
    DELETE_SPORT_SUCCESS,
    EDIT_SPORT_SUCCESS,
    FETCH_SPORTS_SUCCESS
} from "../actions/actionTypes.js"

const sportReducer = (state = [], action = {}) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_SPORT_SUCCESS:
            return [payload, ...state];

        case DELETE_SPORT_SUCCESS:
            return state.filter((sport) => sport.id !== payload);

        case EDIT_SPORT_SUCCESS:
            if (!payload || typeof payload !== "object")
                return state;

            return state.map((sport) =>
                sport.id === payload.id ? { ...sport, ...payload } : sport
            );

        case FETCH_SPORTS_SUCCESS:
            return Array.isArray(payload.data) ? payload.data : payload;

        default:
            return state;
    }
}

export default sportReducer;