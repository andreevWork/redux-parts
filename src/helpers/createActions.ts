import {ISimpleBlock} from "../interfaces";
import {utilReduceByKeys, utilReduceMerge} from "./utils";
import {getTypeByParentName} from "./formatActionType";

export function createActions(actions, reducer, entity_name: string = '') {
    return {
        ...createActionsFromReducer(reducer, entity_name),
        ...createActionsFromDictionary(actions, entity_name)
    }
}

export function createActionsFromCommon(common: ISimpleBlock[] = [], entity_name: string = '') {
    const actions = utilReduceMerge(common, (block: ISimpleBlock) => {
        return createActions(block.actions, block.reducer, entity_name);
    });

    return actions;
}

function createActionsFromReducer(reducer = {}, entity_name: string = '') {
    const actions = utilReduceByKeys(Object.keys(reducer), (key) => {
        const type = getTypeByParentName(key, entity_name);
        return createActionByType(type);
    });

    return actions;
}

function createActionsFromDictionary(dictionary = {}, entity_name: string = '') {
    const actions = utilReduceByKeys(Object.keys(dictionary), (key) => {
        const type = getTypeByParentName(key, entity_name);
        return createActionByFn(type, dictionary[key]);
    });
    
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