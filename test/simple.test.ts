import {Creator} from '../src/index';
import {expect} from 'chai';
import {CounterPart} from "./parts/counter";
import {IComplexPart} from "../src/interfaces";
import {SetPart} from "./parts/set";

const counter_part: IComplexPart = {
    simple_parts: [
        CounterPart
    ]
};

describe("only one simple parts - ", function() {
    let store;

    beforeEach(() => {
        store = Creator(counter_part);
    });

    it("actions - from reducer", function() {
        const incrementAction = store.actions.increment(123);

        expect(incrementAction.type).to.equal('increment');
        expect(incrementAction.payload).to.equal(123);
    });

    it("actions - from actions", function() {
        const payload = 10;
        const addAction: any = store.actions.add(payload);

        expect(addAction.payload).to.deep.equal({value: payload});
    });

    it("reducer", function() {
        const incrementAction = store.actions.increment();
        const state = store.reducer(undefined, incrementAction);

        expect(state.value).to.equal(1);
    });

    it("initial state", function() {
        const state = store.reducer(undefined, {type: 'none'});

        expect(CounterPart.initial_state).to.deep.equal(state);
    });
});



const counter_and_set_part: IComplexPart = {
    simple_parts: [
        CounterPart,
        SetPart
    ]
};

describe("only simple parts multi - ", function() {
    let store;

    beforeEach(() => {
        store = Creator(counter_and_set_part);
    });

    it("actions - from reducer", function() {
        const incrementAction = store.actions.increment();
        const setAction = store.actions.set();

        expect(incrementAction.type).to.equal('increment');
        expect(setAction.type).to.equal('set');
    });

    it("actions - from actions", function() {
        const payload = 10;
        const addAction: any = store.actions.add(payload);

        expect(addAction.payload).to.deep.equal({value: payload});
    });

    it("reducer - counter", function() {
        const incrementAction = store.actions.increment();
        const state = store.reducer(undefined, incrementAction);

        expect(state.value).to.equal(1);
    });

    it("reducer - set", function() {
        const setAction = store.actions.set(100);
        const state = store.reducer(undefined, setAction);

        expect(state.value).to.equal(100);
    });

    it("initial state", function() {
        const state = store.reducer(undefined, {type: 'none'});

        expect(CounterPart.initial_state).to.deep.equal(state);
    });
});


const counter_and_base_part: IComplexPart = {
    initial_state: {
        value: 1
    },

    reducer: {
        decrement(state) {
            return {
                ...state,
                value: state.value - 1
            }
        }
    },

    simple_parts: [
        CounterPart
    ]
};

describe("only simple parts and base - ", function() {
    let store;

    beforeEach(() => {
        store = Creator(counter_and_base_part);
    });

    it("actions - from reducer", function() {
        const incrementAction = store.actions.increment();
        const decrementAction = store.actions.decrement();

        expect(incrementAction.type).to.equal('increment');
        expect(decrementAction.type).to.equal('decrement');
    });

    it("actions - from actions", function() {
        const payload = 10;
        const addAction: any = store.actions.add(payload);

        expect(addAction.payload).to.deep.equal({value: payload});
    });

    it("initial state", function() {
        const state = store.reducer(undefined, {type: 'none'});

        expect(counter_and_base_part.initial_state).to.deep.equal(state);
    });

    it("reducer - counter", function() {
        const incrementAction = store.actions.increment();
        const state = store.reducer(undefined, incrementAction);

        expect(state.value).to.equal(2);
    });

    it("reducer - base", function() {
        const decrementAction = store.actions.decrement();
        const state = store.reducer(undefined, decrementAction);

        expect(state.value).to.equal(0);
    });
});

