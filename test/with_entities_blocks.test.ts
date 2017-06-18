import {Creator} from '../src/creator';
import {expect} from 'chai';
import {AnotherSimpleBlock, SimpleBlock} from "./blocks/simple_block";
import {BlockWithEntityInsideEntity, BlockWithOnlyEntity} from "./blocks/complex_blocks";

describe("blocks with entity blocks - ", function() {
    let store;

    describe('block with only "entity" property consisting of one block', () => {
        beforeEach(() => {
            store = Creator(BlockWithOnlyEntity);
        });

        it("actions from entity from reducer", function() {
            const startAction = store.actions.simple.start(123);

            expect(startAction.type).to.equal('simple.start');
            expect(startAction.payload).to.equal(123);
        });

        it("actions from entity from dictionary", function() {
            const incrementAction = store.actions.simple.increment(1);

            expect(incrementAction.type).to.equal('simple.increment');
            expect(incrementAction.payload).to.equal(2);
        });

        it("reducer from common", function() {
            const startAction = store.actions.simple.start();
            const state = store.reducer(undefined, startAction);

            expect(state.simple.increment_value).to.equal(0);
        });

        it("initial state", function() {
            const state = store.reducer(undefined, {type: 'none'});

            expect(SimpleBlock.initial_state).to.deep.equal(state.simple);
        });
    });

    describe('block with only "entity" property consisting of one block including another entity', () => {
        beforeEach(() => {
            store = Creator(BlockWithEntityInsideEntity);
        });

        it("actions from entity from reducer", function() {
            const startAction = store.actions.just.simple.start(123);

            expect(startAction.type).to.equal('just.simple.start');
            expect(startAction.payload).to.equal(123);
        });

        it("actions from entity from dictionary", function() {
            const incrementAction = store.actions.just.simple.increment(1);

            expect(incrementAction.type).to.equal('just.simple.increment');
            expect(incrementAction.payload).to.equal(2);
        });

        it("reducer from common", function() {
            const startAction = store.actions.just.simple.start();
            const state = store.reducer(undefined, startAction);

            expect(state.just.simple.increment_value).to.equal(0);
        });

        it("initial state", function() {
            const state = store.reducer(undefined, {type: 'none'});

            expect(SimpleBlock.initial_state).to.deep.equal(state.just.simple);
        });
    });
});