import { SET_LOGINDATA } from "../actions/loginDataAction";

const loginData = (state = { value: false }, action) => {
  switch (action.type) {
    case SET_LOGINDATA:
      return { ...state, value: action.payload };
    default:
      return { ...state };
  }
};

export default loginData;
