import {Creator} from '../src/index';
import {expect} from 'chai';
import {CounterPart} from "./parts/counter";

describe("simple part counter - ", function() {
    let store;

    beforeEach(() => {
       store = Creator(CounterPart);
    });

    it("action - type", function() {
        const incrementAction = store.actions.increment();

        expect(incrementAction.type).to.equal('increment');
    });

    it("action - payload. Auto generate", function() {
        const payload = 10;
        const incrementAction = store.actions.increment(payload);

        expect(incrementAction.payload).to.equal(payload);
    });

    it("action - payload. From actions", function() {
        const payload = 10;
        const addAction: any = store.actions.add(payload);

        expect(addAction.payload).to.deep.equal({value: payload});
    });

    it("reducer - exist action", function() {
        const incrementAction = store.actions.increment();
        let state: any = undefined;
        state = store.reducer(state, incrementAction);

        expect(state.value).to.equal(1);
    });

    it("reducer - not exist action", function() {
        const prev_state = {};
        const state = store.reducer(prev_state, {type: 'none'});

        expect(prev_state).to.equal(state);
    });

    it("reducer - multi actions", function() {
        const incrementAction: any = store.actions.increment();
        const addAction: any = store.actions.add(10);

        let state: any = undefined;
        state = store.reducer(state, incrementAction);
        state = store.reducer(state, addAction);

        expect(state.value).to.equal(11);
    });

    it("initial state ", function() {
        const state = store.reducer(undefined, {type: 'none'});

        expect(CounterPart.initial_state).to.deep.equal(state);
    });
});