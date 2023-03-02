import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            // item.product is the item being added
            const item = action.payload;

            const existItem = state.cartItems.find(
                (x) => x.product === item.product
            );

            if (existItem) {
                // If this item is already in the cart, overwrite it with the current action
                // eg. if 1 iPhone is in cart, and user adds 2 iPhones to cart,
                // the 1 iPhone will be overwritten with 2 iPhones
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                // Otherwise just add the new addition to cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                // filter returns all but the cartItem that matches given id (payload)
                cartItems: state.cartItems.filter(
                    (x) => x.product !== action.payload
                ),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                // filter returns all but the cartItem that matches given id (payload)
                shippingAddress: action.payload,
            };

        default:
            return state;
    }
};
