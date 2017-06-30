var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { creator } from "./helpers/creator";
import { buildReducer } from "./helpers/buildReducer";
var MainPart = {
    complex_parts: {}
};
export function addMainPart(part) {
    MainPart = __assign({}, part, { complex_parts: __assign({}, MainPart.complex_parts, part.complex_parts) });
}
export function addComplexPart(name, part) {
    MainPart.complex_parts[name] = part;
}
export function Creator(part) {
    if (part === void 0) { part = MainPart; }
    var _a = creator(part), actions = _a.actions, reducer = _a.reducer, initial_state = _a.initial_state;
    return {
        actions: actions,
        reducer: buildReducer(reducer, initial_state)
    };
}
//# sourceMappingURL=index.js.map