import {
    HIDE_LOADING,
    SHOW_LOADING,
    SHOW_ERROR,
    SHOW_SUCCESS,
    CLEAR_MESSAGES
} from "../actions/actionTypes.js"

const initialUIState = {
    loadingState: false,
    errorMessage: null,
    successMessage: null,
};

const uiReducer = (state = initialUIState, action = {}) => {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                loadingState: true
            };

        case HIDE_LOADING:
            return {
                ...state,
                loadingState: false
            };

        case SHOW_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            };

        case SHOW_SUCCESS:
            return {
                ...state,
                successMessage: action.payload
            };

        case CLEAR_MESSAGES:
            return {
                ...state,
                errorMessage: null,
                successMessage: null
            };

        default:
            return state;
    }
};

export { uiReducer, initialUIState };
