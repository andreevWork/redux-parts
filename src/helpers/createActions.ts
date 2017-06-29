import {IComplexPart, ISimplePart} from "../interfaces";
import {concatStrings, reduceByKeys, reduceMerge} from "./utils";

export function createActions(part: IComplexPart, path?: string) {
    const simple_parts_actions = reduceMerge(part.simple_parts, (part: ISimplePart) => {
        return helperForCreateAction(part);
    });
    const main_actions = helperForCreateAction(part as ISimplePart);

    return {
        ...simple_parts_actions,
        ...main_actions
    };

    function helperForCreateAction({reducer, actions}: ISimplePart) {
        return {
            ...createActionsFromReducer(reducer, path),
            ...createActionsFromDictionary(actions, path)
        }
    }
}

function createActionsFromReducer(reducer = {}, path: string) {
    return reduceByKeys(Object.keys(reducer), (key) => {
        const type = concatStrings(key, path);
        return createActionByType(type);
    });
}

function createActionsFromDictionary(dictionary = {}, path: string) {
    return reduceByKeys(Object.keys(dictionary), (key) => {
        const type = concatStrings(key, path);
        const fn = dictionary[key];
        return createActionByFn(type, fn);
    });
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