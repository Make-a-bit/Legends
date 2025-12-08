import {
    ADD_EVENT_SUCCESS,
    DELETE_EVENT_SUCCESS,
    EDIT_EVENT_SUCCESS,
    FETCH_EVENTS_SUCCESS,
} from "../actions/actionTypes.js"

const eventReducer = (state = [], action = {}) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_EVENT_SUCCESS:
            return [payload, ...state];

        case DELETE_EVENT_SUCCESS:
            return state.filter((event) => event.id !== payload);

        case EDIT_EVENT_SUCCESS:
            if (!payload || typeof payload !== "object")
                return state;

            return state.map((event) =>
                event.id === payload.id ? { ...event, ...payload } : event
            );

        case FETCH_EVENTS_SUCCESS:
            return Array.isArray(payload.data) ? payload.data : payload;

        default:
            return state;
    }
}

export default eventReducer;