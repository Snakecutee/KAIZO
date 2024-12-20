/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { addSession } from "../Redux/Action/ActionSession";
import "./Auth.css";
import queryString from "query-string";
import CartAPI from "../API/CartAPI";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";

function SignIn(props) {
  // listCart được lấy từ redux
  const listCart = useSelector((state) => state.Cart.listCart);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [checkPush, setCheckPush] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    setErrorEmail(false);
    setErrorPassword(false);
    setEmailRegex(false);

    if (!email) {
      setErrorEmail(true);
    } else if (!validateEmail(email)) {
      setEmailRegex(true);
    } else if (!password) {
      setErrorPassword(true);
    } else if (email && validateEmail(email) && password) {
      const body = {
        email,
        password,
      };
      const res = await UserAPI.postLogin(body);
      if (res._id) {
        sessionStorage.setItem("id_user", res._id);
        sessionStorage.setItem("name_user", res.fullname);
        const action = addSession(sessionStorage.getItem("id_user"));
        dispatch(action);
        setCheckPush(true);
      } else if (res === "false") {
        setErrorLogin(true);
      }
    }
  };

  // Hàm này dùng để đưa hết tất cả carts vào API của user
  useEffect(() => {
    const fetchData = async () => {
      // Lần đầu sẽ không thực hiện insert được vì addCart = ''
      const userId = sessionStorage.getItem("id_user");
      if (!userId) {
        console.error("User ID is not available in sessionStorage");
        return;
      }

      if (checkPush === true) {
        for (let i = 0; i < listCart.length; i++) {
          // Nó sẽ lấy idUser và idProduct và count cần thêm để gửi lên server
          const params = {
            idUser: userId,
            idProduct: listCart[i].idProduct,
            count: listCart[i].count,
          };
          const query = "?" + queryString.stringify(params);
          const response = await CartAPI.postAddToCart(query);
          console.log(response);
        }
        history.push("/");
      }
    };
    fetchData();
  }, [checkPush, listCart]);

  const handlerGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Gửi thông tin người dùng lên backend để đăng ký
      const params = {
        fullname: user.displayName,
        email: user.email,
        phone: "",
        password: "", // Nếu bạn không cần lưu mật khẩu thì có thể bỏ qua trường này
      };

      // Lưu thông tin người dùng vào backend
      const res = await UserAPI.postSignUp(params);

      // Sau khi lưu thành công, lưu thông tin người dùng vào sessionStorage
      sessionStorage.setItem("id_user", res._id); // Đảm bảo rằng _id là thuộc tính trả về từ API backend
      sessionStorage.setItem("name_user", res.fullname);

      // Cập nhật session trong Redux
      const action = addSession(sessionStorage.getItem("id_user"));
      dispatch(action);

      // Điều hướng đến trang chính (hoặc trang giỏ hàng, nếu bạn muốn)
      history.push("/");
    } catch (error) {
      console.error("Lỗi khi đăng nhập bằng Google:", error);
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33">Sign In</span>

          <div className="d-flex justify-content-center pb-5">
            {emailRegex && (
              <span className="text-danger">* Incorrect Email Format</span>
            )}
            {errorEmail && (
              <span className="text-danger">* Please Check Your Email</span>
            )}
            {errorPassword && (
              <span className="text-danger">* Please Check Your Password</span>
            )}
            {errorLogin && (
              <span className="text-danger">
                * Please Check Your Email or Password
              </span>
            )}
          </div>

          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              type="text"
              placeholder="Email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="container-login100-form-btn m-t-20">
            <button className="login100-form-btn" onClick={onSubmit}>
              Sign in
            </button>
          </div>
          <div className="container-login100-form-btn m-t-20">
            <button
              className="login100-form-btn google-btn"
              onClick={handlerGoogleSignIn}
            >
              Sign Up with Google
            </button>
          </div>
          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Create an account?</span>
            &nbsp;
            <Link to="/signup" className="txt2 hov1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
