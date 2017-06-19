import {IComplexBlock, ISimpleBlock} from "../interfaces";
import {utilReduceMerge} from "./utils";

export function createInitialState(block: IComplexBlock) {
    const {simple_blocks, initial_state = {}} = block;

    return {
        ...createInitialStateFromSimpleBlocks(simple_blocks),
        ...initial_state
    };
}

function createInitialStateFromSimpleBlocks(simple_blocks: ISimpleBlock[] = []) {
    return utilReduceMerge(simple_blocks, (block: ISimpleBlock) => {
        return block.initial_state || {};
    });
}

