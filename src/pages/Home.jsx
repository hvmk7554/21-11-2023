import React from "react";
import Sidebar from "../component/Sidebar";
import "../component/style.css";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/loginSlice";
function Home() {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setLogout());
    window.location.replace("/");
  };
  return (
    <>
      <Sidebar />
      <div className="main_content dashboard_part">
        <div className="container-fluid g-0">
          <div className="row">
            <div className="col-lg-12 p-0 ">
              <div className="header_iner d-flex justify-content-between align-items-center">
                <div className="sidebar_icon d-lg-none">
                  <i className="ti-menu" />
                </div>
                <div className="serach_field-area">
                  <button className="btn btn-primary">Thêm</button>
                </div>
                <div className="header_right d-flex justify-content-between align-items-center">
                  <div className="profile_info">
                    <img src="img/client_img.png" alt="#" />
                    <div className="profile_info_iner">
                      <div className="profile_author_name">
                        <p>Neurologist </p>
                        <h5>Dr. Robar Smith</h5>
                      </div>
                      <div className="profile_info_details">
                        <a href="#">My Profile </a>
                        <a href="#">Settings</a>
                        <a href="/logout">Log Out</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
