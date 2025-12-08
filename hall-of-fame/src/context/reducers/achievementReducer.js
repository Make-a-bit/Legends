import {
    ADD_ACHIEVEMENT_SUCCESS,
    DELETE_ACHIEVEMENT_SUCCESS,
    EDIT_ACHIEVEMENT_SUCCESS,
    FETCH_ACHIEVEMENTS_SUCCESS
} from "../actions/actionTypes.js";

const achievementReducer = (state = [], action = {}) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_ACHIEVEMENT_SUCCESS:
            return [payload, ...state];

        case DELETE_ACHIEVEMENT_SUCCESS:
            return state.filter(
                (achievement) => achievement.saavutus_id !== payload);

        case EDIT_ACHIEVEMENT_SUCCESS:
            return state.map((achievement) =>
                achievement.saavutus_id === payload.id ? { ...achievement, ...payload } : achievement
            );

        case FETCH_ACHIEVEMENTS_SUCCESS:
            return Array.isArray(payload.data) ? payload.data : payload;

        default:
            return state;
    }
}

export default achievementReducer;