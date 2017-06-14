import {LoadSetBlock} from '../common/LoadSetBlock';
import {FriendsBlock} from './FriendsBlock';

export const UserBlock = {
    initial_state: {
        is_auth: false    
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
        }
    },
    
    common: [
        LoadSetBlock
    ],
    
    entity: {
        friends: FriendsBlock
    }
};