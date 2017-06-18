

export function utilReduceByKeys(arr: any[], cb: any) {
    const reduce_result = arr.reduce((acc, key) => {
        acc[key] = cb(key);
        return acc;
    }, {});

    return reduce_result;
}

export function utilReduceMerge(arr: any[], cb: (item: any) => Object) {
    const reduce_result = arr.reduce((acc, item) => {
        acc = {
            ...acc,
            ...cb(item)
        };

        return acc;
    }, {});

    return reduce_result;
}

export function renameObjectKeys(object, cb: (key: string) => string) {
    const reduce_result = Object.keys(object).reduce((acc, key) => {
        const new_key = cb(key);
        acc[new_key] = object[key];
        return acc;
    }, {});

    return reduce_result;
}

export function setInObjectByPath(object, path: string[], value) {
    let cache = object;
    const last_key = path.pop();

    for (let key of path) {
        cache = cache[key];
    }

    cache[last_key] = value;
}