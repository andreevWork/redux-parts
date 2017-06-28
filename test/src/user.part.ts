import {IComplexPart} from "../../src/interfaces";
import {addComplexPart} from "../../src/index";

const user_part: IComplexPart = {
    initial_state: {
        is_auth: false
    },

    reducer: {
        logIn(state) {
            return {
                ...state,
                is_auth: true
            }
        }
    }
};

addComplexPart('user', user_part);