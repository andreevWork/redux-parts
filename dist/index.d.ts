import { IComplexPart } from "./interfaces";
export declare function addMainPart(part: IComplexPart): void;
export declare function addComplexPart(name: string, part: IComplexPart): void;
export declare function Creator(part?: IComplexPart): {
    actions: any;
    reducer: (state: any, action: any) => any;
};
