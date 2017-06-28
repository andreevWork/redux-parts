import {IComplexPart, ISimplePart} from "../interfaces";
import {addStringIfExist, utilReduceByKeys, utilReduceMerge} from "./utils";

export function createActions(part: IComplexPart, parent_part_name?: string) {
    const simple_parts_actions = utilReduceMerge(part.simple_parts, (part: ISimplePart) => {
        return helperForCreateAction(part);
    });
    const main_actions = helperForCreateAction(part as ISimplePart);

    return {
        ...simple_parts_actions,
        ...main_actions
    };

    function helperForCreateAction({reducer, actions}: ISimplePart) {
        return {
            ...createActionsFromReducer(reducer, parent_part_name),
            ...createActionsFromDictionary(actions, parent_part_name)
        }
    }
}

function createActionsFromReducer(reducer = {}, parent_part_name: string) {
    return utilReduceByKeys(Object.keys(reducer), (key) => {
        const type = addStringIfExist(key, parent_part_name);
        return createActionByType(type);
    });
}

function createActionsFromDictionary(dictionary = {}, parent_part_name: string) {
    return utilReduceByKeys(Object.keys(dictionary), (key) => {
        const type = addStringIfExist(key, parent_part_name);
        return createActionByFn(type, dictionary[key]);
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