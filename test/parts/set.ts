import {ISimplePart} from "../../src/interfaces";

export const SetPart: ISimplePart = {
    reducer: {
        set(state, {payload}) {
            return {
                ...state,
                value: payload
            };
        }
    }
};