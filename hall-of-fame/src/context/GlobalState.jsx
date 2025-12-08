import React, { useReducer } from "react";
import MembersContext from "../context/MembersContext.js";

import athleteReducer from "../context/reducers/athleteReducer.js";
import achievementReducer from "../context/reducers/achievementReducer.js";
import achievementTypeReducer from "../context/reducers/achievementTypeReducer.js";
import competitionReducer from "../context/reducers/competitionReducer.js";
import competitionTypeReducer from "../context/reducers/competitionTypeReducer.js";
import countryReducer from "../context/reducers/countryReducer.js";
import eventReducer from "../context/reducers/eventReducer.js";
import sportReducer from "../context/reducers/sportReducer.js";
import { uiReducer, initialUIState } from "../context/reducers/uiReducer.js";


// Utility to combine multiple reducers
// Returns a new reducer function that takes the entire state object and an action.
// For each key in the reducers object:
// - It calls the corresponding reducer with its slice of state(acc[key]) and the action.
// - It builds a new state object where each key is updated by its reducer.
// The result is a new state object with all slices updated according to their respective reducers.
const combineReducers = (reducers) => {
    return (state, action) =>
        Object.keys(reducers).reduce(
            (acc, key) => ({
                ...acc,
                [key]: reducers[key](acc[key], action),
            }),
            state
        );
}   

// Initial state
const initialState = {
    achievements: [],
    achievementTypes: [],
    athletes: [],
    competitions: [],
    competitionTypes: [],
    countries: [],
    events: [],
    sports: [],
    UI: initialUIState,
};

// Combine all reducers
const rootReducer = combineReducers({
    achievements: achievementReducer,
    achievementTypes: achievementTypeReducer,
    athletes: athleteReducer,
    competitions: competitionReducer,
    competitionTypes: competitionTypeReducer,
    countries: countryReducer,
    events: eventReducer,
    sports: sportReducer,
    UI: uiReducer
});


const GlobalStateProvider = (props) => {
    const [state, dispatchBase] = useReducer(rootReducer, initialState);

    // Thunk-enabled dispatch
    const dispatch = (action) => {
        if (typeof action === "function") {
            // If action is a function (thunk), call it with dispatch
            return action(dispatch);
        }
        return dispatchBase(action);
    };

    return (
        <MembersContext.Provider value={{ state, dispatch }}>
            {props.children}
        </MembersContext.Provider>
    );
};

export { GlobalStateProvider, MembersContext };