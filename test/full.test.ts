import {Creator} from '../src/index';
import {expect} from 'chai';
import {SetPart} from "./parts/set";
import {CounterPart} from "./parts/counter";
import {IComplexPart} from "../src/interfaces";

const full_part: IComplexPart = {
    initial_state: {
        text: 'initial',
        value: 10
    },

    actions: {
        changeText(text: string) {
            return text.toLowerCase();
        }
    },

    reducer: {
        changeText(state, {payload}) {
            return {
                ...state,
                text: payload
            };
        }
    },

    simple_parts: [
        SetPart
    ],

    complex_parts: {
        counter_1: CounterPart,
        counter_2: CounterPart
    }
};

describe('full part -', () => {
    let store;

    beforeEach(() => {
        store = Creator(full_part);
    });

    it('initial state - right merge', () => {
        const state = store.reducer(undefined, {type: 'none'});

        expect(state).to.deep.equal(getNewState('initial'))
    });


    it('send actions and check new state', () => {
        const new_value = 20;
        const changeTextAction = store.actions.changeText('Text');
        const setAction = store.actions.set(new_value);
        const incrementCounter_1Action = store.actions.counter_1.increment();
        const incrementCounter_2Action = store.actions.counter_2.increment();
        let prev_state;
        let state;


        state = store.reducer(prev_state, changeTextAction);

        expect(prev_state).to.not.equal(state);
        expect(state).to.deep.equal(getNewState('text'));

        prev_state = state;

        state = store.reducer(prev_state, setAction);

        expect(prev_state).to.not.equal(state);
        expect(state).to.deep.equal(getNewState('text', new_value));

        prev_state = state;

        state = store.reducer(prev_state, incrementCounter_1Action);

        expect(prev_state).to.not.equal(state);
        expect(state).to.deep.equal(getNewState('text', new_value, 1));

        prev_state = state;

        state = store.reducer(prev_state, incrementCounter_2Action);
        state = store.reducer(state, incrementCounter_2Action);

        expect(prev_state).to.not.equal(state);
        expect(state).to.deep.equal(getNewState('text', new_value, 1, 2));
    });
});


function getNewState(text, value = 10,  value_1 = 0, value_2 = 0) {
    return {
        text,
        value,
        counter_1: {
            value: value_1
        },
        counter_2: {
            value: value_2
        }
    }
}