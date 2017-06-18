import {ISimpleBlock} from "../interfaces";
import {setInObjectByPath, utilReduceMerge} from "./utils";
import {TYPE_DELIMITER} from "./formatActionType";

export function createReducerFromCommon(common: ISimpleBlock[] = []) {
    const reducer = utilReduceMerge(common, (block: ISimpleBlock) => {
        return block.reducer
    });

    return reducer;
}

export function createReducer(dictionary, initial_state) {
    return function (state = initial_state, action) {
        const {type} = action;
        const fn = dictionary[type];

        if (fn) {
            if (type.includes(TYPE_DELIMITER)) {
                setStateByType(state, type, fn(getStateByType(state, type), action));

                return state;
            }

            return fn(state, action);
        }

        return state;
    }
}


function getStateByType(state, type: string) {
    const path = type.split(TYPE_DELIMITER);
    let sub_state = state;

    // We remove last element, because it is action name
    path.pop();

    for (let key of path) {
        sub_state = sub_state[key];
    }

    return sub_state;
}

function setStateByType(state, type: string, value) {
    const path = type.split(TYPE_DELIMITER);

    // We remove last element, because it is action name
    path.pop();

    setInObjectByPath(state, path, value);
}