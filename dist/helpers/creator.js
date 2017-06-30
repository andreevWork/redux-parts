import { createActions } from "./createActions";
import { createReducer } from "./createReducer";
import { createInitialState } from "./createInitialState";
import { concatStrings, mergeByPath } from "./utils";
export function creator(part) {
    var actions = createActions(part);
    var reducer = createReducer(part);
    var initial_state = createInitialState(part);
    var queue = getComplexParts(part.complex_parts);
    while (queue.length) {
        var _a = queue.pop(), part_1 = _a.part, path = _a.path;
        actions = mergeByPath(actions, path, createActions(part_1, path));
        reducer = mergeByPath(reducer, path, createReducer(part_1));
        initial_state = mergeByPath(initial_state, path, createInitialState(part_1));
        queue.push.apply(queue, getComplexParts(part_1.complex_parts, path));
    }
    return {
        actions: actions,
        reducer: reducer,
        initial_state: initial_state
    };
}
function getComplexParts(complex_parts, path) {
    if (complex_parts === void 0) { complex_parts = {}; }
    if (path === void 0) { path = ''; }
    return Object.keys(complex_parts)
        .map(function (part_name) { return ({
        part: complex_parts[part_name],
        path: concatStrings(part_name, path)
    }); });
}
//# sourceMappingURL=creator.js.map