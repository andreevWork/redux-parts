import {DELIMITER} from "./constants";

export function reduceByKeys(arr: any[] = [], cb: any) {
    return arr.reduce((acc, key) => {
        acc[key] = cb(key);
        return acc;
    }, {});
}

export function reduceMerge(arr: any[] = [], cb: (item: any) => Object) {
    return  arr.reduce((acc, item) => {
        acc = {
            ...acc,
            ...cb(item)
        };

        return acc;
    }, {});
}

export function concatStrings(str: string, str_or_null?: string) {
    return `${str_or_null ? `${str_or_null}${DELIMITER}` : ''}${str}`;
}

export function getByPath(obj: any, str: string, delimiter: string = DELIMITER) {
    if (!obj || typeof  obj !== 'object') {
        return null;
    }

    if (typeof  str !== 'string') {
        throw Error('getByPath: second param should be a string type');
    }

    const path = str.split(delimiter);
    let key;

    while(key = path.shift()) {
        obj = obj[key];

        if (!obj) {
            return null;
        }
    }

    return obj;
}

export function mergeByPath(obj: any, str: string, value: any, delimiter: string = DELIMITER) {
    if (!obj || typeof  obj !== 'object' || Array.isArray(obj)) {
        return null;
    }

    if (typeof  str !== 'string') {
        throw Error('mergeByPath: second param should be a string type');
    }

    const path = str.split(delimiter);
    const last_key = path.pop();
    const new_obj = {
        ...obj
    };

    let nested = new_obj;
    let nested_value;

    for (let key of path) {
        nested_value = nested[key];

        if (!nested_value || typeof nested_value !== 'object') {
            throw Error(`mergeByPath: key "${key}" in path "${str}" contains value type "${typeof nested_value}", not object`);
        }

        nested[key] = {
            ...nested_value
        };

        nested = nested[key];
    }

    nested[last_key]= value;

    return new_obj;
}