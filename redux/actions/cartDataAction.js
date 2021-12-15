export const INCREMENT_CARTDATA = "INCREMENT_CARTDATA";
export const DECREMENT_CARTDATA = "DECREMENT_CARTDATA";
export const SET_CARTDATA = "SET_CARTDATA";

export const incrementCartData = () => ({
    type: INCREMENT_CARTDATA
});

export const decrementCartData = () => ({
    type: DECREMENT_CARTDATA
})

export const setCartData = (value) => ({
    type: SET_CARTDATA,
    payload: value
})
