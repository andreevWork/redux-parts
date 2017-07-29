import {Creator} from '../src/index';
import {expect} from 'chai';
import {IComplexPart, ISimplePart} from "../src/interfaces";

/**
 * When your app grow your state became big and deep
 * For better manage deep state you can use "complex_part" property
 * In this property you can use SimplePart or ComplexPart
 * For example: you have counterPart
 * And you wanna create three independent counter
 */

const counter_part: ISimplePart = {
    initial_state: {
        value: 0,
    },
    reducer: {
        add(state, { payload }) {
            return {
                ...state,
                value: state.value + payload,
            }
        }
    }
};

const complex_part: IComplexPart = {
    complex_parts: {
        counter_1: counter_part,
        counter_2: counter_part,
        counter_3: counter_part,
    }
};

describe("EXAMPLES: deep state. ", function() {
    let actions, reducer;

    beforeEach(() => {
        const store = Creator(complex_part);
        actions = store.actions;
        reducer = store.reducer;
    });

    it("actions", function() {
        const add1Action = actions.counter_1.add(1);
        const add2Action = actions.counter_2.add(2);
        const add3Action = actions.counter_3.add(3);

        expect(add1Action).to.deep.equal({ type: 'counter_1.add', payload: 1 });
        expect(add2Action).to.deep.equal({ type: 'counter_2.add', payload: 2 });
        expect(add3Action).to.deep.equal({ type: 'counter_3.add', payload: 3 });
    });

    it("reducer", function() {
        const add1Action = actions.counter_1.add(1);
        const add2Action = actions.counter_2.add(2);
        const add3Action = actions.counter_3.add(3);
        let state;

        state = reducer(state, add1Action);
        state = reducer(state, add2Action);
        state = reducer(state, add3Action);

        expect(state).to.deep.equal({
            counter_1 : {
                value: 1,
            },
            counter_2 : {
                value: 2,
            },
            counter_3 : {
                value: 3,
            },
        });
    });
});