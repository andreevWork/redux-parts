import {IComplexPart, ISimplePart} from "../interfaces";
import {reduceMerge} from "./utils";

export function createInitialState(part: IComplexPart) {
    const {simple_parts, initial_state = {}} = part;

    return {
        ...createInitialStateFromSimple(simple_parts),
        ...initial_state
    };
}

function createInitialStateFromSimple(simple_parts: ISimplePart[] = []) {
    return reduceMerge(simple_parts, (part: ISimplePart) => {
        return part.initial_state || {};
    });
}

