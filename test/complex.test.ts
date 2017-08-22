import {Creator} from '../src/index';
import {expect} from 'chai';
import {IComplexPart} from "../src/interfaces";
import {CounterPart} from "./parts/counter";

const complex_counter_part: IComplexPart = {
    complex_parts: {
        counter: CounterPart
    }
};

let store;

describe("complex part - ", function() {

    beforeEach(() => {
        store = Creator(complex_counter_part);
    });

    it("actions - from reducer", function() {
        const incrementAction: any = store.actions.counter.increment(123);

        expect(incrementAction.type).to.equal('counter.increment');
        expect(incrementAction.payload).to.equal(123);
    });

    it("actions - from actions", function() {
        const payload = 10;
        const addAction: any = store.actions.counter.add(payload);

        expect(addAction.payload).to.deep.equal({value: payload});
    });

    it("reducer", function() {
        const incrementAction = store.actions.counter.increment();
        const state = store.reducer(undefined, incrementAction);

        expect(state.counter.value).to.equal(1);
    });

    it("initial state", function() {
        const state = store.reducer(undefined, {type: 'none'});

        expect(CounterPart.initial_state).to.deep.equal(state.counter);
    });
});

const sub_complex_counter_part: IComplexPart = {
    complex_parts: {
        sub: complex_counter_part
    }
};

describe('complex part inside complex part -', () => {
    beforeEach(() => {
        store = Creator(sub_complex_counter_part);
    });

    it("actions - from reducer", function() {
        const incrementAction: any = store.actions.sub.counter.increment(123);

        expect(incrementAction.type).to.equal('sub.counter.increment');
        expect(incrementAction.payload).to.equal(123);
    });

    it("actions - from actions", function() {
        const payload = 10;
        const addAction: any = store.actions.sub.counter.add(payload);

        expect(addAction.payload).to.deep.equal({value: payload});
    });

    it("reducer", function() {
        const incrementAction = store.actions.sub.counter.increment();
        const state = store.reducer(undefined, incrementAction);
        console.log(state);
        expect(state.sub.counter.value).to.equal(1);
    });

    it("initial state", function() {
        const state = store.reducer(undefined, {type: 'none'});

        expect(CounterPart.initial_state).to.deep.equal(state.sub.counter);
    });
});

const complex_and_base_part: IComplexPart = {
    simple_parts: [
        CounterPart
    ],

    complex_parts: {
        counter: CounterPart
    }
};

describe('complex part and base -', () => {
    beforeEach(() => {
        store = Creator(complex_and_base_part);
    });

    it("actions - from reducer", function() {
        const incrementComplexAction: any = store.actions.counter.increment();
        const incrementAction: any = store.actions.increment();

        expect(incrementComplexAction.type).to.equal('counter.increment');
        expect(incrementAction.type).to.equal('increment');
    });

    it("actions - from actions", function() {
        const payload = 10;
        const addComplexAction: any = store.actions.counter.add(payload);
        const addAction: any = store.actions.add(payload);


        expect(addComplexAction.type).to.equal('counter.add');
        expect(addAction.type).to.equal('add');
        expect(addComplexAction.payload).to.deep.equal({value: payload});
        expect(addAction.payload).to.deep.equal({value: payload});
    });

    it("reducer - complex", function() {
        const incrementAction = store.actions.counter.increment();
        const state = store.reducer(undefined, incrementAction);

        expect(state.counter.value).to.equal(1);
    });

    it("reducer - base", function() {
        const incrementAction = store.actions.increment();
        const state = store.reducer(undefined, incrementAction);

        expect(state.value).to.equal(1);
    });

    it("initial state", function() {
        const state = store.reducer(undefined, {type: 'none'});

        expect({
            ...CounterPart.initial_state,
            counter: CounterPart.initial_state
        }).to.deep.equal(state);
    });
});

const complex_for_initial_state: IComplexPart = {
    initial_state: {
        test: 'test'
    },

    reducer: {
        clear(state, action, initial_state) {
            return initial_state;
        },
        notCleat(state, action, initial_state) {
            // nothing in this variable
            return initial_state;
        }
    },

    simple_parts: [
        CounterPart
    ],

    complex_parts: {
        counter: CounterPart,
        nested: {
            initial_state: {
                nested: 'nested',
            },
            reducer: {
                clear(state, action, initial_state) {
                    return initial_state;
                }
            },
            complex_parts: {
                counter: CounterPart
            }
        }
    }
};
const initialStateNested = {
    nested: 'nested',
    counter: CounterPart.initial_state
};

describe('complex part pass initial state -', () => {

    const initialSate = {
        ...complex_for_initial_state.initial_state,
        ...CounterPart.initial_state,
        counter: CounterPart.initial_state,
        nested: initialStateNested
    };

    beforeEach(() => {
        store = Creator(complex_for_initial_state);
    });

    it("clear root", function() {
        const incrementNestedAction = store.actions.counter.increment();
        const incrementAction = store.actions.increment();
        const clearAction = store.actions.clear();
        let state;

        state = store.reducer(state, { type: 'randomType' });

        expect(state).to.deep.equal(initialSate);

        state = store.reducer(state, incrementNestedAction);
        state = store.reducer(state, incrementAction);

        expect(state).to.not.deep.equal(initialSate);

        state = store.reducer(state, clearAction);

        expect(state).to.deep.equal(initialSate);
    });

    it("clear nested", function() {
        const incrementNestedNestedAction = store.actions.nested.counter.increment();
        const clearNestedAction = store.actions.nested.clear();
        let state;

        state = store.reducer(state, { type: 'randomType' });

        expect(state.nested).to.deep.equal(initialStateNested);

        state = store.reducer(state, incrementNestedNestedAction);

        expect(state.nested).to.not.deep.equal(initialStateNested);

        state = store.reducer(state, clearNestedAction);

        expect(state.nested).to.deep.equal(initialStateNested);
    });

    it("if not include 'clear' not pass", function() {
        const notCleatAction = store.actions.notCleat();
        let state;

        state = store.reducer(state, { type: 'randomType' });

        expect(state).to.deep.equal(initialSate);

        state = store.reducer(state, notCleatAction);

        expect(state).to.be.undefined;
    });
});