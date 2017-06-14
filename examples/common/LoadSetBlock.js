export const LoadSetBlock = {
    reducer: {
        load(state, action){
            state = {
                ...state,
                is_pending: true,
                data: null
            };

            return state;
        },
        set(state, {payload}){

            state = {
                ...state,
                is_pending: false,
                data: payload
            };

            return state;
        }
    }
};