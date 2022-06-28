import UserProps from "../../classes/user";

const setUserReducer = (
  state = { user: new UserProps() },
  action: { type: string; user: UserProps }
) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default setUserReducer;
