import { useNavigate } from "react-router-dom";
import { currentUser } from "../recoil/users/currentUser/atom";
import { useRecoilState } from "recoil";

function userHook() {
  const navigate = useNavigate();
  const [cUser, setCUser] = useRecoilState(currentUser);

  function userStorage(string) {
    if (string === "MyPage") {
      if (Object.keys(cUser).length === 0) {
        if (JSON.parse(localStorage.getItem("currentUsers")) !== null) {
          setCUser(JSON.parse(localStorage.getItem("currentUsers" || [])));
        } else {
          myLittleFunction();
        }
      }
    } else {
      if (Object.keys(cUser).length === 0) {
        if (JSON.parse(localStorage.getItem("currentUsers")) !== null) {
          setCUser(JSON.parse(localStorage.getItem("currentUsers" || [])));
        }
      }
    }
  }

  function myLittleFunction() {
    navigate("/Login");
  }

  return { userStorage };
}

export default userHook;
