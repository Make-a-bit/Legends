import {
    ADD_ACHIEVEMENT_TYPE_SUCCESS,
    DELETE_ACHIEVEMENT_TYPE_SUCCESS,
    EDIT_ACHIEVEMENT_TYPE_SUCCESS,
    FETCH_ACHIEVEMENT_TYPES_SUCCESS
} from "../actions/actionTypes";

const achievementTypeReducer = (state = [], action = {}) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_ACHIEVEMENT_TYPE_SUCCESS:
            return [payload, ...state];

        case DELETE_ACHIEVEMENT_TYPE_SUCCESS:
            return state.filter((type) => type.id !== payload);

        case EDIT_ACHIEVEMENT_TYPE_SUCCESS:
            if (!payload || typeof payload !== "object")
                return state;

            return state.map((type) =>
                type.id === action.payload.id ? { ...type, ...payload } : type
            );

        case FETCH_ACHIEVEMENT_TYPES_SUCCESS:
            return Array.isArray(payload.data) ? payload.data : payload;

        default:
            return state;
    }
}

export default achievementTypeReducer;