type Actions = {
    [key: string]: (...args) => any;
};
type Reducer = {
    [key: string]: (state: any, action: any) => any;
};

export interface ISimpleBlock {
    reducer: Reducer;
    actions?: Actions;
    initial_state?: any;
}

export interface IComplexBlock {
    reducer?: Reducer;
    actions?: Actions;
    initial_state?: any;

    simple_blocks?: ISimpleBlock[];
    complex_blocks?: {
        [key: string]: IComplexBlock;
    }
}
