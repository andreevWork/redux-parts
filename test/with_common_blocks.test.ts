import {Creator} from '../src/creator';
import {expect} from 'chai';
import {
    BlockWithOnlyMultiCommonBLocks, BlockWithOnlyOneCommonBLock,
    BlockWithoutEntities
} from "./blocks/complex_blocks";
import {AnotherSimpleBlock, SimpleBlock} from "./blocks/simple_block";

describe("blocks with common blocks", function() {
    let store;

    describe('block with only "common" property consisting of one common block', () => {
        beforeEach(() => {
            store = Creator(BlockWithOnlyOneCommonBLock);
        });

        it("actions from common from reducer", function() {
            const startAction = store.actions.start(123);

            expect(startAction.type).to.equal('start');
            expect(startAction.payload).to.equal(123);
        });

        it("actions from common from dictionary", function() {
            const incrementAction = store.actions.increment(1);

            expect(incrementAction.type).to.equal('increment');
            expect(incrementAction.payload).to.equal(2);
        });

        it("reducer from common", function() {
            const startAction = store.actions.start();
            const state = store.reducer(undefined, startAction);

            expect(state.increment_value).to.equal(0);
        });

        it("initial state", function() {
            const state = store.reducer(undefined, {type: 'none'});

            expect(SimpleBlock.initial_state).to.deep.equal(state);
        });
    });

    describe('block with only "common" property consisting of multi common block', () => {
        beforeEach(() => {
            store = Creator(BlockWithOnlyMultiCommonBLocks);
        });

        it("actions from first common", function() {
            const startAction = store.actions.start(123);

            expect(startAction.type).to.equal('start');
            expect(startAction.payload).to.equal(123);
        });

        it("actions from second common", function() {
            const addAction = store.actions.add(1);

            expect(addAction.type).to.equal('add');
            expect(addAction.payload).to.equal(1);
        });

        it("reducer from first common", function() {
            const startAction = store.actions.start();
            const state = store.reducer(undefined, startAction);

            expect(state.increment_value).to.equal(0);
        });

        it("reducer from second common", function() {
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

    describe('block with all simple block properties and common - tests about merge', () => {
        beforeEach(() => {
            store = Creator(BlockWithoutEntities);
        });

        it("right merge initial state", function() {
            const state = store.reducer(undefined, {type: 'none'});

            expect({
                initial_value: 'own',
                initial_value_1: 'common_2'
            }).to.deep.equal(state);
        });

        it("right merge action from own", function() {
            const action = store.actions.action();
            const state = store.reducer(undefined, action);

            expect(state.value).to.equal('own');
            expect(state.common_1_value).to.be.undefined;
        });

        it("right merge action from last common", function() {
            const commonAction = store.actions.commonAction();
            const state = store.reducer(undefined, commonAction);

            expect(state.common_2_value).to.equal('common_2');
            expect(state.common_1_value).to.be.undefined;
        });
    });
});