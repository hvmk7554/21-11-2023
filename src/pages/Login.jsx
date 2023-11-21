import React, { useState } from "react";
import axios, { Axios } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Notyf } from "notyf";
import { setLogin } from "../redux/loginSlice";
import { Link } from "react-router-dom";
import Icon2 from "../component/Icon2";
import "../component/icon2.css";
function Login() {
  const url = "http://127.0.0.1:8000/api/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [checkLogin1, setCheckLogin] = useState(false);
  const notyfR = new Notyf({
    position: {
      x: "right",
      y: "top",
    },
    types: [
      {
        type: "info",
        background: "blue",
        icon: false,
      },
    ],
  });

  const checkLogin = () => {
    if (email == "") {
      notyfR.open({
        type: "error",
        message: "Thiếu email đăng nhập",
      });
    } else if (password == "") {
      notyfR.open({
        type: "error",
        message: "Thiếu mật khẩu đăng nhập",
      });
    } else {
      axios({
        method: "post",
        url: url + "checkLogin",
        data: {
          email: email,
          password: password,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.check == true) {
          const user = {
            email: email,
            token: res.data.token,
          };
          localStorage.setItem("user", JSON.stringify(user));
          notyfR.open({
            type: "success",
            message: "Đăng nhập thành công",
          });
          window.location.replace("/education");
        } else if (res.data.check == false) {
          if (res.data.msg.email) {
            notyfR.open({
              type: "error",
              message: res.data.msg.email,
            });
          } else if (res.data.msg.password) {
            notyfR.open({
              type: "error",
              message: res.data.msg.password,
            });
          } else if (res.data.msg) {
            notyfR.open({
              type: "error",
              message: res.data.msg,
            });
          }
        }
      });
    }
  };
  return (
    <>
      {checkLogin1 == false && (
        <div className="row">
          <div className="col-lg-12">
            <div className="white_box mb_30">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="modal-content cs_modal">
                    <div className="modal-header justify-content-center theme_bg_1">
                      <h5 className="modal-title text_white">Log in</h5>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <a
                          href="#"
                          className="btn_1 full_width text-center"
                          onClick={(e) => checkLogin()}
                        >
                          Log in
                        </a>
                        <p>
                          Need an account?{" "}
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#sing_up"
                            data-bs-dismiss="modal"
                            href="#"
                          >
                            {" "}
                            Sign Up
                          </a>
                        </p>
                        <div className="text-center">
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#forgot_password"
                            data-bs-dismiss="modal"
                            className="pass_forget_btn"
                          >
                            Forget Password?
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {checkLogin1 == true && (
        <div className="container text-center">
          <div className="row row-cols-1 row-cols-xl-2 justify-content-center">
            <div className="col mt-5 mt-sm-0 mt-xl-5">
              <Icon2 />
              <a className="btn btn-primary" href={"/education"}>
                Chuyển trang
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
