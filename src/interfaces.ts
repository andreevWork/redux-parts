type Actions = {
    [key: string]: (...args) => any;
};

type Reducer = {
    [key: string]: (state: any, action: any) => any;
};

export interface ISimplePart {
    reducer: Reducer;
    actions?: Actions;
    initial_state?: any;
}

export interface IComplexPart {
    reducer?: Reducer;
    actions?: Actions;
    initial_state?: any;

    simple_parts?: ISimplePart[];
    complex_parts?: {
        [key: string]: IComplexPart;
    }
}
