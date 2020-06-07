import {
  registerUser,
  loginUser,
  auth,
  logoutUser,
} from "../../src/_actions/user_actions";
import { useDispatch } from "react-redux";
var dispatch = useDispatch();

test("1.0 register user", (done) => {
  var response = dispatch(
    registerUser({
      email: `test${Math.floor(Math.random() * 20000) + 100}@gmail.com`,
      password: "123456@",
      first_name: "Test",
      last_name: "User",
    })
  );
  expect(response.payload.register).not.toBe(false);
});
