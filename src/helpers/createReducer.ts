import {IComplexPart, ISimplePart} from "../interfaces";
import {reduceMerge} from "./utils";

export function createReducer(part: IComplexPart) {
    const {simple_parts, reducer = {}} = part;

    return  {
        ...createReducerFromSimple(simple_parts),
        ...reducer
    };
}

function createReducerFromSimple(simple_parts: ISimplePart[] = []) {
    return reduceMerge(simple_parts, (part: ISimplePart) => {
        return part.reducer
    });
}