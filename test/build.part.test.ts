import {actions, reducer} from './src/index';
import {expect} from 'chai';

describe("actions from build - ", function() {

    it("actions - from main part", function() {
        const incrementAction: any = actions.counter.increment();
        const markInitAction: any = actions.markInit();

        expect(incrementAction.type).to.equal('counter.increment');
        expect(markInitAction.type).to.equal('markInit');
    });

    it("actions - from user part", function() {
        const logInAction: any = actions.user.logIn();

        expect(logInAction.type).to.equal('user.logIn');
    });

    it("reducer - from main part", function() {
        const markInitAction: any = actions.markInit();
        const state = reducer(undefined, markInitAction);

        expect(state.is_init).to.be.true;
    });

    it("reducer - from main part complex", function() {
        const incrementAction: any = actions.counter.increment();
        const state = reducer(undefined, incrementAction);

        expect(state.counter.value).to.equal(1);
    });

    it("reducer - from user part", function() {
        const logInAction: any = actions.user.logIn();
        const state = reducer(undefined, logInAction);

        expect(state.user.is_auth).to.be.true;
    });

    it("initial state", function() {
        const state = reducer(undefined, {type: 'none'});

        expect({
            is_init: false,
            counter: {
                value: 0
            },
            user: {
                is_auth: false
            }
        }).to.deep.equal(state);
    });
});