import {DELIMITER} from "./constants";
import {getByPath, mergeByPath} from "./utils";

export  function buildReducer(reducer, initial_state) {
    const prefixForPassInitialState = 'clear';

    return function (state = initial_state, action) {
        const {type} = action;
        const hasPassInitialState = type.toLowerCase().includes(prefixForPassInitialState);

        let handle_action = reducer[type];

        if (handle_action) {
            return hasPassInitialState ?
                handle_action(state, action, initial_state)
                :
                handle_action(state, action);
        }

        if (type.includes(DELIMITER)) {
            handle_action = getByPath(reducer, type);

            if (handle_action) {
                const path_local_state = type
                    .split(DELIMITER)
                    .slice(0, -1)
                    .join(DELIMITER);

                const local_state = getByPath(state, path_local_state);

                const new_local_state = hasPassInitialState ?
                    handle_action(local_state, action, getByPath(initial_state, path_local_state))
                    :
                    handle_action(local_state, action);

                return mergeByPath(state, path_local_state, new_local_state);
            }
        }

        return state;
    }
}