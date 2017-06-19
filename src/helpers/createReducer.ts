import {IComplexBlock, ISimpleBlock} from "../interfaces";
import {utilReduceMerge} from "./utils";

export function createReducer(block: IComplexBlock) {
    const {simple_blocks, reducer = {}} = block;

    return  {
        ...createReducerFromSimpleBlocks(simple_blocks),
        ...reducer
    };
}

function createReducerFromSimpleBlocks(simple_blocks: ISimpleBlock[] = []) {
    return utilReduceMerge(simple_blocks, (block: ISimpleBlock) => {
        return block.reducer
    });
}