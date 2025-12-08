import {
    ADD_COMPETITION_TYPE_SUCCESS,
    DELETE_COMPETITION_TYPE_SUCCESS,
    EDIT_COMPETITION_TYPE_SUCCESS,
    FETCH_COMPETITION_TYPES_SUCCESS
} from "../actions/actionTypes.js"

const competitionTypeReducer = (state = [], action = {}) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_COMPETITION_TYPE_SUCCESS:
            return [payload, ...state];

        case DELETE_COMPETITION_TYPE_SUCCESS:
            return state.filter((type) => type.id !== payload);

        case EDIT_COMPETITION_TYPE_SUCCESS:
            if (!payload || typeof payload !== "object")
                return state;

            return state.map((type) =>
                type.id === payload.id ? { ...type, ...payload} : type
            );

        case FETCH_COMPETITION_TYPES_SUCCESS:
            return Array.isArray(payload.data) ? payload.data : payload;

        default:
            return state;
    }
}

export default competitionTypeReducer;