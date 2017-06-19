import {IComplexBlock} from "../interfaces";
import {createActions} from "./createActions";
import {createReducer} from "./createReducer";
import {createInitialState} from "./createInitialState";
import {addStringIfExist, setByPath} from "./utils";

interface IQueueItem {
    block: IComplexBlock;
    block_name: string;
}

export function creator(block: IComplexBlock) {
    const actions = createActions(block);
    const reducer = createReducer(block);
    const initial_state = createInitialState(block);

    let queue: IQueueItem[] = getQueueItemsOfComplexBlocks(block.complex_blocks);

    while(queue.length) {
        const {block, block_name} = queue.pop();

        setByPath(actions, block_name, createActions(block, block_name));
        setByPath(reducer, block_name, createReducer(block));
        setByPath(initial_state, block_name, createInitialState(block));

        queue = queue.concat(getQueueItemsOfComplexBlocks(block.complex_blocks, block_name));
    }

    return {
        actions,
        reducer,
        initial_state
    }
}

function getQueueItemsOfComplexBlocks(complex_blocks = {}, parent_name?: string) {
    return Object.keys(complex_blocks)
        .map(block_name => ({
            block: complex_blocks[block_name],
            block_name: addStringIfExist(block_name, parent_name)
        }));
}