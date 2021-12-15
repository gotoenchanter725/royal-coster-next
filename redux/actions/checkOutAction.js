export const CLIENT_CREATED = "CLIENT_CREATED";
export const PRODUCTS_FOUND = "PRODUCTS_FOUND";
export const CHECKOUT_FOUND = "CHECKOUT_FOUND";
export const SHOP_FOUND = "SHOP_FOUND";

export const creatCheckout = (client) => ({
    type: CLIENT_CREATED,
    payload: client
})

export const productFound = (res) => ({
    type: PRODUCTS_FOUND,
    payload: res
})

export const checkoutFound = (res) => ({
    type: CHECKOUT_FOUND,
    payload: res
})

export const shopFound = (res) => ({
    type: SHOP_FOUND,
    payload: res
})