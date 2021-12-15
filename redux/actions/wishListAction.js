export const INCREMENT_WISHLIST = "INCREMENT_WISHLIST";
export const DECREMENT_WISHLIST = "DECREMENT_WISHLIST";
export const SET_WISHLIST = "SET_WISHLIST";

export const incrementWishList = () => ({
    type: INCREMENT_WISHLIST
});

export const decrementWishList = () => ({
    type: DECREMENT_WISHLIST
})

export const setWishList = (value) => ({
    type: SET_WISHLIST,
    payload: value
})
