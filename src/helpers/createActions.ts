import {ISimpleBlock} from "../interfaces";

export function createActions(actions, reducer) {
    return {
        ...createActionsFromReducer(reducer),
        ...createActionsFromDictionary(actions)
    }
}

export function createActionsFromCommon(common: ISimpleBlock[] = []) {
    const actions = common.reduce((acc, block: ISimpleBlock) => {
        acc = {
            ...acc,
            ...createActions(block.actions, block.reducer)
        };
        return acc;
    }, {});

    return actions;
}

function createActionsFromReducer(reducer = {}) {
    const reducer_keys = Object.keys(reducer);

    const actions = reducer_keys.reduce((acc, name) => {
        acc[name] = createActionByType(name);
        return acc;
    }, {});

    return actions;
}

function createActionsFromDictionary(dictionary = {}) {
    const actions = Object.keys(dictionary).reduce((acc, name) => {
        acc[name] = createActionByFn(name, dictionary[name]);
        return acc;
    }, {});
    
    return actions;
}
function createActionByType(type) {    
    return function (payload) {
        return {
            type,
            payload
        }
    }
}

function createActionByFn(type, fn) {
    return function (...args) {
        return {
            type,
            payload: fn(...args)
        }
    }
}