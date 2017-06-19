export function utilReduceByKeys(arr: any[] = [], cb: any) {
    return arr.reduce((acc, key) => {
        acc[key] = cb(key);
        return acc;
    }, {});
}

export function utilReduceMerge(arr: any[] = [], cb: (item: any) => Object) {
    return  arr.reduce((acc, item) => {
        acc = {
            ...acc,
            ...cb(item)
        };

        return acc;
    }, {});
}

export const TYPE_DELIMITER: string = '.';

export function addStringIfExist(str: string, str_or_null?: string) {
    return `${str_or_null ? `${str_or_null}${TYPE_DELIMITER}` : ''}${str}`;
}

export function setByPath(obj: any, str: string, value: any) {
    const path = str.split(TYPE_DELIMITER);
    const last_key = path.pop();

    for (let key of path) {
        obj = obj[key];
    }

    obj[last_key] = value;
}