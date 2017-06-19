import {IComplexBlock, ISimpleBlock} from "../interfaces";
import {addStringIfExist, utilReduceByKeys, utilReduceMerge} from "./utils";

export function createActions(block: IComplexBlock, parent_block_name?: string) {
    const simple_blocks_actions = utilReduceMerge(block.simple_blocks, (block: ISimpleBlock) => {
        return helperForCreateAction(block);
    });
    const main_actions = helperForCreateAction(block as ISimpleBlock);

    return {
        ...simple_blocks_actions,
        ...main_actions
    };

    function helperForCreateAction({reducer, actions}: ISimpleBlock) {
        return {
            ...createActionsFromReducer(reducer, parent_block_name),
            ...createActionsFromDictionary(actions, parent_block_name)
        }
    }
}

function createActionsFromReducer(reducer = {}, parent_block_name: string) {
    return utilReduceByKeys(Object.keys(reducer), (key) => {
        const type = addStringIfExist(key, parent_block_name);
        return createActionByType(type);
    });
}

function createActionsFromDictionary(dictionary = {}, parent_block_name: string) {
    return utilReduceByKeys(Object.keys(dictionary), (key) => {
        const type = addStringIfExist(key, parent_block_name);
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