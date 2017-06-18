import {Creator} from '../src/creator';
import {expect} from 'chai';
import {SimpleBlock, SimpleBlockOnlyReducer, SimpleBlockWithoutInitialValue} from "./blocks/simple_block";

describe("the simplest block", function() {
    let store;

    describe('block With Reducer - only reducer', () => {
        beforeEach(() => {
            store = Creator(SimpleBlockOnlyReducer);
        });

        it("type", function() {
            const startAction = store.actions.start();

            expect(startAction.type).to.equal('start');
        });

        it("payload", function() {
            const payload = {test: 'test'};
            const startAction = store.actions.start(payload);

            expect(startAction.payload).to.equal(payload);
        });


        it("exists action - new state, with changes", function() {
            const startAction = store.actions.start();
            const prev_state = {};
            const state = store.reducer(prev_state, startAction);

            expect(state.increment_value).to.equal(0);
            expect(prev_state).to.not.equal(state);
        });

        it("not exists action - the same state", function() {
            const prev_state = {};
            const state = store.reducer(prev_state, {type: 'none'});

            expect(prev_state).to.equal(state);
        });

        it("not initial_state - empty object initial state", function() {
            const state = store.reducer(undefined, {type: 'none'});

            expect(state).to.be.empty;
        });
    });

    describe('block With Reducer - reducer and actions', () => {
        beforeEach(() => {
            store = Creator(SimpleBlockWithoutInitialValue);
        });

        it("action from reducer", function() {
            const startAction = store.actions.start();
            const prev_state = {};
            const state = store.reducer(prev_state, startAction);

            expect(state.increment_value).to.equal(0);
            expect(prev_state).to.not.equal(state);
        });

        it("complex action - action", function() {
            const incrementAction: any = store.actions.increment(1);

            expect(incrementAction.type).to.equal('increment');
            expect(incrementAction.payload).to.equal(2);
        });

        it("complex action - reducer", function() {
            const incrementAction: any = store.actions.increment(1);
            const prev_state = {};
            const state = store.reducer(prev_state, incrementAction);

            expect(state.increment_value).to.equal(2);
            expect(prev_state).to.not.equal(state);
        });
    });

    describe('block With Reducer - reducer and initial state', () => {
        beforeEach(() => {
            store = Creator(SimpleBlock);
        });

        it("to have initial state ", function() {
            const state = store.reducer(undefined, {type: 'none'});

            expect(SimpleBlock.initial_state).to.deep.equal(state);
        });
    });
});