import {ISimplePart} from "../../src/interfaces";

export const CounterPart: ISimplePart = {
    initial_state: {
        value: 0
    },

    actions: {
        add(value) {
            return {value};
        }
    },

    reducer: {
        increment(state, action) {
            return {
                ...state,
                value: state.value + 1
            };
        },
        add(state, {payload}) {
            return {
                ...state,
                value: state.value + payload.value
            };
        }
    }
};