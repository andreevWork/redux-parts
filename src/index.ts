import {IComplexPart} from "./interfaces";
import {creator} from "./helpers/creator";
import {buildReducer} from "./helpers/buildReducer";

let MainPart: IComplexPart = {
    complex_parts: {}
};

export function addMainPart(part: IComplexPart) {
    MainPart = {
        ...part,
        complex_parts: {
            ...MainPart.complex_parts,
            ...part.complex_parts
        }
    }
}

export function addComplexPart(name: string, part: IComplexPart) {
    MainPart.complex_parts[name] = part;
}

export function Creator(part: IComplexPart = MainPart) {
    const {actions, reducer, initial_state} = creator(part);

    return {
        actions,
        reducer: buildReducer(reducer, initial_state)
    }
}