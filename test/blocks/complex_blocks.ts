import {IComplexBlock} from "../../src/interfaces";
import {AnotherSimpleBlock, SimpleBlock} from "./simple_block";

export const BlockWithOnlyOneCommonBLock: IComplexBlock = {
    common: [
        SimpleBlock
    ]
};

export const BlockWithOnlyMultiCommonBLocks: IComplexBlock = {
    common: [
        SimpleBlock,
        AnotherSimpleBlock
    ]
};

export const BlockWithoutEntities: IComplexBlock = {
    initial_state: {
        initial_value: 'own'
    },

    actions: {
        action() {
            return 'own';
        }
    },

    reducer: {
        action(state, {payload}) {
            state = {
                ...state,
                value: payload
            };
            return state;
        }
    },

    common: [
        {
            initial_state: {
                initial_value: 'common',
                initial_value_1: 'common_1'
            },

            reducer: {
                action(state, {payload}) {
                    state = {
                        ...state,
                        common_1_value: payload
                    };
                    return state;
                },
                commonAction(state, {payload}) {
                    state = {
                        ...state,
                        common_1_value: payload
                    };
                    return state;
                }
            }
        },

        {
            initial_state: {
                initial_value_1: 'common_2'
            },

            actions: {
                commonAction() {
                    return 'common_2'
                }
            },

            reducer: {
                commonAction(state, {payload}) {
                    state = {
                        ...state,
                        common_2_value: payload
                    };
                    return state;
                }
            }
        }
    ]
};

export const BlockWithOnlyEntity: IComplexBlock = {
    entity: {
        simple: SimpleBlock
    }
};