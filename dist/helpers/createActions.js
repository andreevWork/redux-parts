var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { concatStrings, reduceByKeys, reduceMerge } from "./utils";
export function createActions(part, path) {
    var simple_parts_actions = reduceMerge(part.simple_parts, function (part) {
        return helperForCreateAction(part);
    });
    var main_actions = helperForCreateAction(part);
    return __assign({}, simple_parts_actions, main_actions);
    function helperForCreateAction(_a) {
        var reducer = _a.reducer, actions = _a.actions;
        return __assign({}, createActionsFromReducer(reducer, path), createActionsFromDictionary(actions, path));
    }
}
function createActionsFromReducer(reducer, path) {
    if (reducer === void 0) { reducer = {}; }
    return reduceByKeys(Object.keys(reducer), function (key) {
        var type = concatStrings(key, path);
        return createActionByType(type);
    });
}
function createActionsFromDictionary(dictionary, path) {
    if (dictionary === void 0) { dictionary = {}; }
    return reduceByKeys(Object.keys(dictionary), function (key) {
        var type = concatStrings(key, path);
        var fn = dictionary[key];
        return createActionByFn(type, fn);
    });
}
function createActionByType(type) {
    return function (payload) {
        return {
            type: type,
            payload: payload
        };
    };
}
function createActionByFn(type, fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return {
            type: type,
            payload: fn.apply(void 0, args)
        };
    };
}
//# sourceMappingURL=createActions.js.map