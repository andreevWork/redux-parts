import {Creator} from '../src/index';
import {expect} from 'chai';
import {IComplexPart, ISimplePart} from "../src/interfaces";

/**
 * Apart from SimplePart you can create ComplexPart
 * One of ComplexPart property is "simple_parts"
 * This property allows you merge(mixin) many simple parts to your ComplexPart
 * For example you have incrementPart and decrementPart
 * And you wanna create a part, which has increment and decrement functionality
 */

const increment_part: ISimplePart = {
    initial_state: {
        value: 0,
    },
    reducer: {
        increment(state) {
            return {
                ...state,
                value: state.value + 1,
            }
        }
    }
};
const decrement_part: ISimplePart = {
    initial_state: {
        value: 0,
    },
    reducer: {
        decrement(state) {
            return {
                ...state,
                value: state.value - 1,
            }
        }
    }
};

const complex_part: IComplexPart = {
    simple_parts: [
        increment_part,
        decrement_part,
    ]
};

describe("EXAMPLES: mixin simple part. ", function() {
    let actions, reducer;

    beforeEach(() => {
        const store = Creator(complex_part);
        actions = store.actions;
        reducer = store.reducer;
    });

    it("actions", function() {
        const incrementAction = actions.increment();
        const decrementAction = actions.decrement();

        expect(incrementAction.type).to.equal('increment');
        expect(decrementAction.type).to.equal('decrement');
    });

    it("reducer", function() {
        const incrementAction = actions.increment();
        const decrementAction = actions.decrement();
        let state;

        state = reducer(state, incrementAction);
        state = reducer(state, incrementAction);
        state = reducer(state, incrementAction);
        state = reducer(state, decrementAction);

        expect(state).to.deep.equal({ value: 2 });
    });
});