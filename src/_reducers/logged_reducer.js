import { LOGGED_USER } from "../_actions/types"

const logged_Reducer = (state = true, action) => {
    switch(action.type){
        case LOGGED_USER:
            return !state;
        default:
            return state;
    }
};
export default logged_Reducer;