import {
    ADD_COMPETITION_SUCCESS,
    DELETE_COMPETITION_SUCCESS,
    EDIT_COMPETITION_SUCCESS,
    FETCH_COMPETITIONS_SUCCESS
} from "../actions/actionTypes.js";

const competitionReducer = (state = [], action = {}) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_COMPETITION_SUCCESS:
            return [payload, ...state]

        case DELETE_COMPETITION_SUCCESS:
            return state.filter(competition => competition.id !== payload);

        case EDIT_COMPETITION_SUCCESS:
            if (!payload || typeof payload !== "object")
                return state;

            return state.map(competition =>
                competition.id === payload.id ? { ...competition, ...payload } : competition
            );

        case FETCH_COMPETITIONS_SUCCESS:
            return Array.isArray(payload.data) ? payload.data : payload;

        default:
            return state;
    }
}

export default competitionReducer;