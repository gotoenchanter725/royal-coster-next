import {
    DECREMENT_WISHLIST,
    INCREMENT_WISHLIST,
    SET_WISHLIST,
} from "../actions/wishListAction";

const wishList = (state = { value: 0 }, action) => {
    switch (action.type) {
        case INCREMENT_WISHLIST:
            return { ...state, value: state.value + 1 };
        case DECREMENT_WISHLIST:
            return { ...state, value: state.value - 1 };
        case SET_WISHLIST:
            return { ...state, value: [...action.payload]};
        default:
            return { ...state };
    }
};

export default wishList;
