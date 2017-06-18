import {Creator} from '../src/creator';
import {expect} from 'chai';
import {IComplexBlock, ISimpleBlock} from "../src/interfaces";

const increment_block: ISimpleBlock = {
    initial_state: {
        value: 0
    },

    reducer: {
        add(state, action) {
            state = {
                ...state,
                value: state.value + 1
            };
            return state;
        }
    }
};

const set_block: ISimpleBlock = {
    initial_state: {
        value: 0
    },

    actions: {
        set(value) {
            return {value};
        }
    },

    reducer: {
        set(state, {payload}) {
            state = {
                ...state,
                value: payload.value
            };
            return state;
        }
    }
};

const set_and_increment_block: IComplexBlock = {
    common: [
        increment_block,
        set_block
    ]
};

const block: IComplexBlock = {
    initial_state: {
        text: 'initial'
    },

    actions: {
        changeText(text) {
            return {text};
        }
    },

    reducer: {
        changeText(state, {payload}) {
            state = {
                ...state,
                text: payload.text
            };
            return state;
        }
    },


    common: [
        increment_block
    ],

    entity: {
        counter_1: set_and_increment_block,
        counter_2: set_and_increment_block
    }
};

describe('full complex block -', () => {
    let store;

    beforeEach(() => {
        store = Creator(block);
    });

    it('initial value - right merge', () => {
        const state = store.reducer(undefined, {type: 'none'});

        expect(state).to.deep.equal({
            text: 'initial',
            value: 0,
            counter_1: {
                value: 0
            },
            counter_2: {
                value: 0
            }
        })
    });


    it('send actions and check new state', () => {
        const new_text = 'new_text';
        const new_value = 20;
        const changeTextAction = store.actions.changeText(new_text);
        const addAction = store.actions.add();
        const addCounter1Action = store.actions.counter_1.add();
        const setCounter2Action = store.actions.counter_2.set(new_value);
        let state;


        state = store.reducer(state, changeTextAction);
        state = store.reducer(state, addAction);
        state = store.reducer(state, addAction);
        state = store.reducer(state, addAction);
        state = store.reducer(state, addCounter1Action);
        state = store.reducer(state, addCounter1Action);
        state = store.reducer(state, setCounter2Action);

        expect(state).to.deep.equal({
            text: new_text,
            value: 3,
            counter_1: {
                value: 2
            },
            counter_2: {
                value: new_value
            }
        })
    });
});