import { DELIMITER } from "./constants";
import { getByPath, mergeByPath } from "./utils";
export function buildReducer(reducer, initial_state) {
    return function (state, action) {
        if (state === void 0) { state = initial_state; }
        var type = action.type;
        var handle_action = reducer[type];
        if (handle_action) {
            return handle_action(state, action);
        }
        if (type.includes(DELIMITER)) {
            handle_action = getByPath(reducer, type);
            var path_local_state = type
                .split(DELIMITER)
                .slice(0, -1)
                .join(DELIMITER);
            var local_state = getByPath(state, path_local_state);
            var new_local_state = handle_action(local_state, action);
            return mergeByPath(state, path_local_state, new_local_state);
        }
        return state;
    };
}
//# sourceMappingURL=buildReducer.js.map