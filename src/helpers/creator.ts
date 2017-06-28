import {IComplexPart} from "../interfaces";
import {createActions} from "./createActions";
import {createReducer} from "./createReducer";
import {createInitialState} from "./createInitialState";
import {addStringIfExist, mergeByPath} from "./utils";

interface IQueueItem {
    part: IComplexPart;
    part_name: string;
}

export function creator(part: IComplexPart) {
    let actions = createActions(part);
    let reducer = createReducer(part);
    let initial_state = createInitialState(part);

    const queue: IQueueItem[] = getQueueItemsOfComplexBlocks(part.complex_parts);

    while(queue.length) {
        const {part, part_name} = queue.pop();

        actions = mergeByPath(actions, part_name, createActions(part, part_name));
        reducer = mergeByPath(reducer, part_name, createReducer(part));
        initial_state = mergeByPath(initial_state, part_name, createInitialState(part));

        queue.push(...getQueueItemsOfComplexBlocks(part.complex_parts, part_name));
    }

    return {
        actions,
        reducer,
        initial_state
    }
}

function getQueueItemsOfComplexBlocks(complex_parts = {}, parent_name: string = '') {
    return Object.keys(complex_parts)
        .map(part_name => ({
            part: complex_parts[part_name],
            part_name: addStringIfExist(part_name, parent_name)
        }));
}