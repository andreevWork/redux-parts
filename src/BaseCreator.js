import { createActions, handleActions, combineActions } from 'redux-actions';

export class BaseCreator {
    /**
     * Decorator for redux-actions combineActions utils
     * @static
     * @param args
     * @returns {*}
     */
    static combineActions(...args) {
        return combineActions(...args);
    }

    /**
     * You can set your specific default state;
     * @type {{}}
     */
    default_state = {};

    /**
     * Method for naming sub-tree your actions and reducer
     * @abstract
     * @returns {string}
     */
    getName() {
        return '';
    }

    /**
     * Method for creating reducer.
     * @abstract
     * @param actions
     * @returns {{}}
     */
    getReducer(actions){
        return {};
    };

    /**
     * Method for creating complex actions, with some logic
     * @type {{}}
     */
    getComplexActions(){
        return {};
    };

    /**
     * Method for creating simple actions, which just pass arguments
     * @returns {Array}
     */
    getSimpleActions(){
        return [];
    };

    /**
     * @public
     * @returns {{actions: *, reducer: *}}
     */
    buildCreator() {
        let actions = createActions({
            ...this.buildSimpleActions(),
            ...this.buildComplexActions()
        });

        const reducer = handleActions(
            this.buildReducer(actions),
            this.default_state
        );

        return {
            name: this.getName(),
            actions,
            reducer
        }
    }

    /**
     * @private
     * @param actions
     * @returns {{}}
     */
    buildReducer(actions) {
        let reducer = this.getReducer(actions);

        if (!reducer) {
            throw Error(`Redux-oopsome Error: method getReducer in "${this.name}" creator, is required`);
        }

        if (typeof reducer !== 'object') {
            throw Error(`Redux-oopsome Error: method getReducer in "${this.name}" creator, must return object.`);
        }

        return reducer;
    }

    /**
     * @private
     * @returns {{}}
     */
    buildComplexActions() {
        let actions = this.getComplexActions();

        if (!actions) {
            return {};
        }

        if (typeof actions !== 'object') {
            throw Error(`Redux-oopsome Error: method getActions in "${this.name}" creator, must return object.`);
        }

        return actions;
    }

    /**
     * @private
     * @returns {{}}
     */
    buildSimpleActions() {
        let simple_actions = this.getSimpleActions();

        if (!simple_actions || simple_actions.length === 0) {
            return {};
        }

        if (!Array.isArray(simple_actions)) {
            throw Error(`Redux-oopsome Error: method SimpleAction in "${this.name}" creator, must return array.`);
        }

        simple_actions = simple_actions.reduce((prev, action_name) => {
            prev[action_name] = x => x;
            return prev;
        }, {});

        return simple_actions;
    }
}