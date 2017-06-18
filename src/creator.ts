import {createReducer} from "./helpers/createReducer";
import {createActionsFromCommon} from "./helpers/createActions";
import {createActions} from "./helpers/createActions";
import {IComplexBlock} from "./interfaces";

export function Creator(block: IComplexBlock) {
    return CreatorWithSubTree(block, '');
}

function CreatorWithSubTree({
    reducer,
    initial_state,
    actions,
    common,
    entity = {}
}: IComplexBlock, name_sub_tree: string) {
    const build_entity = Object.keys(entity).reduce((prev: any, a) => {
        const e = CreatorWithSubTree(entity[a], a);
        prev.actions[a] = e.actions;

        return prev;
    }, {actions: {}});

    if (name_sub_tree) {
        reducer = addNameSubTree(reducer, name_sub_tree);
    }

    console.log(build_entity.actions);
    const build_actions = {
        ...createActionsFromCommon(common),
        ...createActions(actions, reducer),
        ...build_entity.actions
    };

    const build_reducer = createReducer(reducer, initial_state, common);

    return {
        actions: build_actions,
        reducer: build_reducer
    }
}

function addNameSubTree(reducer, name) {
    const new_reducer = Object.keys(reducer).reduce((prev: any, a) => {
        prev[`${name}.${a}`] = reducer[a];
        return prev;
    }, {});

    return new_reducer;
}