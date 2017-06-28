import {IComplexPart, ISimplePart} from "../interfaces";
import {utilReduceMerge} from "./utils";

export function createReducer(part: IComplexPart) {
    const {simple_parts, reducer = {}} = part;

    return  {
        ...createReducerFromSimple(simple_parts),
        ...reducer
    };
}

function createReducerFromSimple(simple_parts: ISimplePart[] = []) {
    return utilReduceMerge(simple_parts, (part: ISimplePart) => {
        return part.reducer
    });
}