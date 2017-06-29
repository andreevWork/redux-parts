import {IComplexPart} from "../interfaces";
import {createActions} from "./createActions";
import {createReducer} from "./createReducer";
import {createInitialState} from "./createInitialState";
import {concatStrings, mergeByPath} from "./utils";

export function creator(part: IComplexPart) {
    let actions = createActions(part);
    let reducer = createReducer(part);
    let initial_state = createInitialState(part);

    const queue = getComplexParts(part.complex_parts);

    while(queue.length) {
        const {part, path} = queue.pop();

        actions = mergeByPath(actions, path, createActions(part, path));
        reducer = mergeByPath(reducer, path, createReducer(part));
        initial_state = mergeByPath(initial_state, path, createInitialState(part));

        queue.push(...getComplexParts(part.complex_parts, path));
    }

    return {
        actions,
        reducer,
        initial_state
    }
}

function getComplexParts(complex_parts = {}, path: string = '') {
    return Object.keys(complex_parts)
        .map(part_name => ({
            part: complex_parts[part_name],
            path: concatStrings(part_name, path)
        }));
}