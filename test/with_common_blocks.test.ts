import {Creator} from '../src/creator';
import {expect} from 'chai';
import {
    BlockWithOnlyMultiCommonBLocks, BlockWithOnlyOneCommonBLock,
    BlockWithoutEntities
} from "./blocks/complex_blocks";
import {AnotherSimpleBlock, SimpleBlock} from "./blocks/simple_block";

describe("blocks with simple_blocks blocks", function() {
    let store;

    describe('block with only "simple_blocks" property consisting of one simple_blocks block', () => {
        beforeEach(() => {
            store = Creator(BlockWithOnlyOneCommonBLock);
        });

        it("actions from simple_blocks from reducer", function() {
            const startAction = store.actions.start(123);

            expect(startAction.type).to.equal('start');
            expect(startAction.payload).to.equal(123);
        });

        it("actions from simple_blocks from dictionary", function() {
            const incrementAction = store.actions.increment(1);

            expect(incrementAction.type).to.equal('increment');
            expect(incrementAction.payload).to.equal(2);
        });

        it("reducer from simple_blocks", function() {
            const startAction = store.actions.start();
            const state = store.reducer(undefined, startAction);

            expect(state.increment_value).to.equal(0);
        });

        it("initial state", function() {
            const state = store.reducer(undefined, {type: 'none'});

            expect(SimpleBlock.initial_state).to.deep.equal(state);
        });
    });

    describe('block with only "simple_blocks" property consisting of multi simple_blocks block', () => {
        beforeEach(() => {
            store = Creator(BlockWithOnlyMultiCommonBLocks);
        });

        it("actions from first simple_blocks", function() {
            const startAction = store.actions.start(123);

            expect(startAction.type).to.equal('start');
            expect(startAction.payload).to.equal(123);
        });

        it("actions from second simple_blocks", function() {
            const addAction = store.actions.add(1);

            expect(addAction.type).to.equal('add');
            expect(addAction.payload).to.equal(1);
        });

        it("reducer from first simple_blocks", function() {
            const startAction = store.actions.start();
            const state = store.reducer(undefined, startAction);

            expect(state.increment_value).to.equal(0);
        });

        it("reducer from second simple_blocks", function() {
            const addAction = store.actions.add({value: 1});
            const state = store.reducer(undefined, addAction);

            expect(state.value).to.equal(1);
        });

        it("initial state", function() {
            const state = store.reducer(undefined, {type: 'none'});

            expect({
                ...SimpleBlock.initial_state,
                ...AnotherSimpleBlock.initial_state
            }).to.deep.equal(state);
        });

    });

    describe('block with all simple block properties and simple_blocks - tests about merge', () => {
        beforeEach(() => {
            store = Creator(BlockWithoutEntities);
        });

        it("right merge initial state", function() {
            const state = store.reducer(undefined, {type: 'none'});

            expect({
                initial_value: 'own',
                initial_value_1: 'simple_blocks_2'
            }).to.deep.equal(state);
        });

        it("right merge action from own", function() {
            const action = store.actions.action();
            const state = store.reducer(undefined, action);

            expect(state.value).to.equal('own');
            expect(state.simple_blocks_1_value).to.be.undefined;
        });

        it("right merge action from last simple_blocks", function() {
            const simple_blocksAction = store.actions.simple_blocksAction();
            const state = store.reducer(undefined, simple_blocksAction);

            expect(state.simple_blocks_2_value).to.equal('simple_blocks_2');
            expect(state.simple_blocks_1_value).to.be.undefined;
        });
    });
});