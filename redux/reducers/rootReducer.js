import wishList from "./wishListReducer";
import cartData from "./cartDataReducer";
import loginData from "./loginDataReducer";
import checkOut from "./checkOutReducer";
import Api2 from "./api2";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  wishList: wishList,
  cartData: cartData,
  checkOut: checkOut,
  loginData: loginData,
  Api2: Api2,
});

export default rootReducer;
