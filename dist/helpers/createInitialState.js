var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { reduceMerge } from "./utils";
export function createInitialState(part) {
    var simple_parts = part.simple_parts, _a = part.initial_state, initial_state = _a === void 0 ? {} : _a;
    return __assign({}, createInitialStateFromSimple(simple_parts), initial_state);
}
function createInitialStateFromSimple(simple_parts) {
    if (simple_parts === void 0) { simple_parts = []; }
    return reduceMerge(simple_parts, function (part) {
        return part.initial_state || {};
    });
}
//# sourceMappingURL=createInitialState.js.map