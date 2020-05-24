import { AUTH_USER } from "../_actions/types"

const logged_Reducer = (state = false, action) => {
    switch(action.type){
        case AUTH_USER:
            return action.payload.isAuth;
        default:
            return state;
    }
};
export default logged_Reducer;