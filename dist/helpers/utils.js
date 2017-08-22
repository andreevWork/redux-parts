var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { DELIMITER } from "./constants";
export function reduceByKeys(arr, cb) {
    if (arr === void 0) { arr = []; }
    return arr.reduce(function (acc, key) {
        acc[key] = cb(key);
        return acc;
    }, {});
}
export function reduceMerge(arr, cb) {
    if (arr === void 0) { arr = []; }
    return arr.reduce(function (acc, item) {
        acc = __assign({}, acc, cb(item));
        return acc;
    }, {});
}
export function concatStrings(str, str_or_null) {
    return "" + (str_or_null ? "" + str_or_null + DELIMITER : '') + str;
}
export function getByPath(obj, str, delimiter) {
    if (delimiter === void 0) { delimiter = DELIMITER; }
    if (!obj || typeof obj !== 'object') {
        return null;
    }
    if (typeof str !== 'string') {
        throw Error('getByPath: second param should be a string type');
    }
    var path = str.split(delimiter);
    var key;
    var new_obj = obj;
    while (key = path.shift()) {
        new_obj = new_obj[key];
        if (!new_obj) {
            return null;
        }
    }
    return new_obj;
}
export function mergeByPath(obj, str, value, delimiter) {
    if (delimiter === void 0) { delimiter = DELIMITER; }
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        return null;
    }
    if (typeof str !== 'string') {
        throw Error('mergeByPath: second param should be a string type');
    }
    var path = str.split(delimiter);
    var last_key = path.pop();
    var new_obj = __assign({}, obj);
    var nested = new_obj;
    var nested_value;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var key = path_1[_i];
        nested_value = nested[key];
        if (!nested_value || typeof nested_value !== 'object') {
            throw Error("mergeByPath: key \"" + key + "\" in path \"" + str + "\" contains value type \"" + typeof nested_value + "\", not object");
        }
        nested[key] = __assign({}, nested_value);
        nested = nested[key];
    }
    nested[last_key] = value;
    return new_obj;
}
//# sourceMappingURL=utils.js.map