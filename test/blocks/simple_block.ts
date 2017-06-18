import {ISimpleBlock} from "../../src/interfaces";

export const SimpleBlockOnlyReducer: ISimpleBlock = {
    reducer: {
        start(state, action) {
            state = {
                ...state,
                increment_value: 0
            };

            return state;
        }
    }
};

export const SimpleBlockWithoutInitialValue: ISimpleBlock = {
    actions: {
        increment(num) {
            return num + 1;
        }
    },

    reducer: {
        start(state, action) {
            state = {
                ...state,
                increment_value: 0
            };

            return state;
        },
        increment(state, {payload}) {
            state = {
                ...state,
                increment_value: payload
            };
            return state;
        }
    }
};

export const SimpleBlock: ISimpleBlock = {
    initial_state: {
        initial: true
    },

    actions: {
        increment(num) {
            return num + 1;
        }
    },

    reducer: {
        start(state, action) {
            state = {
                ...state,
                increment_value: 0
            };

            return state;
        },
        increment(state, {payload}) {
            state = {
                ...state,
                increment_value: payload
            };
            return state;
        }
    }
};
export const AnotherSimpleBlock: ISimpleBlock = {
    reducer: {
        add(state, {payload}) {
            state = {
                ...state,
                value: payload.value
            };

            return state;
        }
    }
};
