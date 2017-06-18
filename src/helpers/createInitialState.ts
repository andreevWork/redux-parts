import {ISimpleBlock} from "../interfaces";
import {utilReduceMerge} from "./utils";

export function createInitialStateFromCommon(common: ISimpleBlock[] = []) {
    const initial_state = utilReduceMerge(common, (block: ISimpleBlock) => {
        return block.initial_state || {}
    });

    return initial_state;
}