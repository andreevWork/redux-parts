import {create} from '../src/index';
import {UserBlock} from '../examples/entity/UserBlock';
const expect = require('chai').expect;

describe("Redux-oopsome test", function() {
    let store;

    beforeEach(() => {
        store = create(UserBlock);
    });
    
    describe('actions from reducer', function () {
        it("type", function() {
            const logInAction = store.actions.logIn();

            expect(logInAction.type).to.equal('logIn');
        });
        it("payload", function() {
            const logInAction = store.actions.logIn({test: 'test'});

            expect(logInAction.payload.test).to.equal('test');
        });
    });

    it("reducer", function() {
        const logInAction = store.actions.logIn();
        const state = store.reducer(UserBlock.initial_state, logInAction);

        expect(state.is_auth).to.be.true;
    });
});