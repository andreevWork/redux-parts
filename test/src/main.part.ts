import {IComplexPart} from "../../src/interfaces";
import {CounterPart} from "../parts/counter";
import {addMainPart} from "../../src/index";

const main_part: IComplexPart = {
    initial_state: {
        is_init: false
    },

    reducer: {
        markInit(state) {
            return {
                ...state,
                is_init: true
            }
        }
    },

    complex_parts: {
        counter: CounterPart
    }
};

addMainPart(main_part);