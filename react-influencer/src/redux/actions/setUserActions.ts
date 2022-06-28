import UserProps from "../../classes/user";

const setUser = (user: UserProps) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

export default setUser;
