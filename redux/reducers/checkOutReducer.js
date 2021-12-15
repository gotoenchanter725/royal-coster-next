// import {
//     CLIENT_CREATED,
//     PRODUCTS_FOUND,
//     SHOP_FOUND,
//     CHECKOUT_FOUND
// } from "../actions/checkOutAction";

const initState = {
    isCartOpen: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {}
}

const CLIENT_CREATED = "CLIENT_CREATED";
const PRODUCTS_FOUND = "PRODUCTS_FOUND";
const CHECKOUT_FOUND = "CHECKOUT_FOUND";
const SHOP_FOUND = "SHOP_FOUND";

const checkOut = (state = initState, action) => {
    switch (action.type) {
        case CLIENT_CREATED:
            return { ...state, client: action.payload }
        case PRODUCTS_FOUND:
            return { ...state, products: action.payload }
        case CHECKOUT_FOUND:
            return { ...state, checkout: action.payload }
        case SHOP_FOUND:
            return { ...state, shop: action.payload }
        default:
            return { ...state };
    }
};

export default checkOut;
