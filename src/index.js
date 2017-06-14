export function create({reducer}) {
    const actions = {
        ...getActionsFromReducer(reducer)
    };

    reducer =
    
    return {
        actions,
        reducer
    }
}

function getActionsFromReducer(reducer) {
    let actions = Object.keys(reducer);

    actions = actions.reduce((acc, name) => {
        acc[name] = createAction(name);
        return acc;
    }, {});

    return actions;
}

function createAction(type) {
    return function (payload) {
        return {
            type,
            payload
        }
    }
}
