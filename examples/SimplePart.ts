import {Creator} from '../src/index';
import {expect} from 'chai';
import {ISimplePart} from "../src/interfaces";

/**
 * Example for Simple part https://github.com/andreevWork/redux-parts#simplepart
 * Simple part also can be the main part.
 */

const sum_part: ISimplePart = {
    initial_state: {
        value: 0,
    },
    actions: {
        sumNumbers(a, b) {
            return a + b;
        }
    },
    reducer: {
        sumNumbers(state, { payload }) {
            return {
                ...state,
                value: state.value + payload,
            }
        }
    }
};


describe("EXAMPLES: simple part. ", function() {
    let actions, reducer;

    beforeEach(() => {
        const store = Creator(sum_part);
        actions = store.actions;
        reducer = store.reducer;
    });

    it("actions", function() {
        const sumNumbersAction = actions.sumNumbers(2, 3);

        expect(sumNumbersAction).to.deep.equal({ type: 'sumNumbers', payload: 5 });
    });

    it("reducer", function() {
        const sumNumbersAction = actions.sumNumbers(2, 3);
        const state = reducer(undefined, sumNumbersAction);

        expect(state).to.deep.equal({ value: sumNumbersAction.payload });
    });
});