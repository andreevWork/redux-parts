import {IComplexBlock} from "../../src/interfaces";
import {AnotherSimpleBlock, SimpleBlock} from "./simple_block";

export const BlockWithOnlyOneCommonBLock: IComplexBlock = {
    simple_blocks: [
        SimpleBlock
    ]
};

export const BlockWithOnlyMultiCommonBLocks: IComplexBlock = {
    simple_blocks: [
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

    simple_blocks: [
        {
            initial_state: {
                initial_value: 'simple_blocks',
                initial_value_1: 'simple_blocks_1'
            },

            reducer: {
                action(state, {payload}) {
                    state = {
                        ...state,
                        simple_blocks_1_value: payload
                    };
                    return state;
                },
                simple_blocksAction(state, {payload}) {
                    state = {
                        ...state,
                        simple_blocks_1_value: payload
                    };
                    return state;
                }
            }
        },

        {
            initial_state: {
                initial_value_1: 'simple_blocks_2'
            },

            actions: {
                simple_blocksAction() {
                    return 'simple_blocks_2'
                }
            },

            reducer: {
                simple_blocksAction(state, {payload}) {
                    state = {
                        ...state,
                        simple_blocks_2_value: payload
                    };
                    return state;
                }
            }
        }
    ]
};

export const BlockWithOnlyEntity: IComplexBlock = {
    complex_blocks: {
        simple: SimpleBlock
    }
};

export const BlockWithEntityInsideEntity: IComplexBlock = {
    complex_blocks: {
        just: BlockWithOnlyEntity
    }
};