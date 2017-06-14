export const PaginationBlock = {
    reducer: {
        loadMore(state, action){
            state = {
                ...state,
                is_pending: true,
                offset: state.offset + 20 || 0
            };

            return state;
        },
        setMore(state, {payload}){
            state = {
                ...state,
                is_pending: false,
                data: state.data.concat(payload)
            };

            return state;
        }
    }
};