import {
    DECREMENT_CARTDATA,
    INCREMENT_CARTDATA,
    SET_CARTDATA,
} from "../actions/cartDataAction";

const cartData = (state = { value: 0 }, action) => {
    switch (action.type) {
        case INCREMENT_CARTDATA:
            return { ...state, value: state.value + 1 };
        case DECREMENT_CARTDATA:
            return { ...state, value: state.value - 1 };
        case SET_CARTDATA:
            return { ...state, value: [...action.payload]};
        default:
            return { ...state };
    }
};

export default cartData;
