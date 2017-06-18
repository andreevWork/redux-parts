import {ICommonBlock} from "../../src/interfaces";

export const LoadDataCommonBlock: ICommonBlock = {
    initial_state: {
        is_pending: false,
        data: null
    },

    actions: {
        errorLoadData(data) {
            if (data.error) {
                return data;
            }

            return {
                error: data.error_msg
            }
        }    
    },
    
    reducer: {
        startLoadData(state, action){
            state = {
                ...state,
                is_pending: true,
                data: null
            };

            return state;
        },
        successLoadData(state, {payload}){
            state = {
                ...state,
                is_pending: false,
                data: payload
            };

            return state;
        },
        errorLoadData(state, {payload}) {
            state = {
                ...state,
                is_pending: false,
                error: true,
                error_data: payload.error
            }
        }
    }
};