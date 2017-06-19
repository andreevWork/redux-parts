import {IComplexBlock} from "./interfaces";
import {creator} from "./helpers/creator";
import {TYPE_DELIMITER} from "./helpers/utils";

export function Creator(block: IComplexBlock) {
    const {actions, reducer, initial_state} = creator(block);

    return {
        actions,
        reducer: buildReducer(reducer, initial_state)
    }
}

function buildReducer(reducer, initial_state) {
    return function (state = initial_state, action) {
        const {type} = action;

        let new_state = state;
        let handle_action = reducer[type];

        if (handle_action) {
            new_state = handle_action(state, action);
        } else {
            if (type.includes(TYPE_DELIMITER)) {
                const path = type.split(TYPE_DELIMITER);
                const action_name = path.pop();
                const last_block_name = path.pop();

                handle_action = reducer;

                for (let key of path) {
                    state = state[key];
                    handle_action = handle_action[key];
                }

                handle_action = handle_action[last_block_name][action_name];

                state[last_block_name] = handle_action(state[last_block_name], action);
            }
        }

        return new_state;
    }
}