
import {ICommonBlock} from "../interfaces";

export function createReducer(dictionary, initial_state = {}, common: ICommonBlock[] = []) {
    dictionary = {
        ...common.reduce((acc, block) => {
            acc = {
                ...acc,
                ...block.reducer
            };
            return acc;
        }, {}),
        ...dictionary
    };

    initial_state = {
        ...common.reduce((acc, block) => {
            acc = {
                ...acc,
                ...(block.initial_state || {})
            };
            return acc;
        }, {}),
        ...initial_state
    };

    return function (state = initial_state, action) {
        const fn = dictionary[action.type];

        if (fn) {
            return fn(state, action);
        }

        return state;
    }
}