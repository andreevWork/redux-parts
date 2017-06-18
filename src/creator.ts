import {createReducer, createReducerFromCommon} from "./helpers/createReducer";
import {createActionsFromCommon} from "./helpers/createActions";
import {createActions} from "./helpers/createActions";
import {IComplexBlock} from "./interfaces";
import {createInitialStateFromCommon} from "./helpers/createInitialState";
import {getTypeByParentName, TYPE_DELIMITER} from "./helpers/formatActionType";
import {renameObjectKeys, setInObjectByPath, utilReduceMerge} from "./helpers/utils";

interface IStackItem {
    block: IComplexBlock;
    entity_name: string;
}

export function Creator(block: IComplexBlock) {
    let actions;
    let reducer;
    let initial_state;
    const stack: IStackItem[] = [];

    stack.push(getStackItem(block, ''));

    while(stack.length) {
        const {block, entity_name: current_entity_name} = stack.pop();

        const block_actions = {
            ...createActionsFromCommon(block.common, current_entity_name),
            ...createActions(block.actions, block.reducer, current_entity_name)
        };

        const block_reducer = {
            ...createReducerFromCommon(block.common),
            ...(block.reducer || {})
        };

        const block_initial_state = {
            ...createInitialStateFromCommon(block.common),
            ...(block.initial_state || {})
        };

        if (current_entity_name) {
            setInObjectByPath(actions, current_entity_name.split(TYPE_DELIMITER), block_actions);

            reducer = {
                ...renameObjectKeys(block_reducer, key => {
                   return getTypeByParentName(key, current_entity_name)
                }),
                ...reducer
            };

            setInObjectByPath(initial_state, current_entity_name.split(TYPE_DELIMITER), block_initial_state);
        } else {
            actions = block_actions;
            reducer = block_reducer;
            initial_state = block_initial_state;
        }

        if (block.entity) {
            Object.keys(block.entity)
                .forEach(entity_name => {
                    stack.push(getStackItem(
                        block.entity[entity_name],
                        getTypeByParentName(entity_name, current_entity_name)
                    ))
                });
        }
    }

    return {
        actions,
        reducer: createReducer(reducer, initial_state)
    }
}

function getStackItem(block, entity_name): IStackItem {
    return {
        block,
        entity_name
    }
}
//
// function CreatorWithSubTree({
//     reducer,
//     initial_state,
//     actions,
//     common,
//     entity = {}
// }: IComplexBlock, name_sub_tree: string) {
//     const build_entity = Object.keys(entity).reduce((prev: any, a) => {
//         const e = CreatorWithSubTree(entity[a], a);
//         prev.actions[a] = e.actions;
//
//         return prev;
//     }, {actions: {}});
//
//     if (name_sub_tree) {
//         reducer = addNameSubTree(reducer, name_sub_tree);
//     }
//
//     const build_actions = {
//         ...createActionsFromCommon(common),
//         ...createActions(actions, reducer),
//         ...build_entity.actions
//     };
//
//     const build_reducer = createReducer(reducer, initial_state, common);
//
//     return {
//         actions: build_actions,
//         reducer: build_reducer
//     }
// }