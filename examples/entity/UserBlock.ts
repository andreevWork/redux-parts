import {LoadDataCommonBlock} from '../common/LoadDataCommonBlock';
import {IEntityBlock} from "../../src/interfaces";
// import {FriendsBlock} from './FriendsBlock';

export const UserBlock: IEntityBlock = {
    initial_state: {
        is_auth: false    
    },
    
    actions: {
        updateTime(time) {
            return {
                time
            }
        }
            
    },
    
    reducer: {
        logIn(state, action) {
            
            state = {
                ...state,
                is_auth: true
            };
            
            return state;
        },
        logOut(state, action) {

            state = {
                ...state,
                is_auth: false
            };

            return state;
        },
        updateTime(state, action) {
            state = {
                ...state,
                time: action.payload.time
            };
            
            return state;
        }
    },
    
    common: [
        LoadDataCommonBlock
    ],
    
    // entity: {
    //     friends: FriendsBlock
    // }
};