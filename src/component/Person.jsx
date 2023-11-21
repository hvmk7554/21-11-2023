import React from "react";

function Person() {
  const logout = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }
    window.location.replace("/");
  };
  return (
    <>
      <div className="header_right d-flex justify-content-between align-items-center">
        <div className="profile_info">
          <img src="/img/client_img.png" alt="#" />
          <div className="profile_info_iner">
            <div className="profile_author_name">
              <p>Neurologist </p>
              <h5>Dr. Robar Smith</h5>
            </div>
            <div className="profile_info_details">
              <a href="#">My Profile </a>
              <a href="#">Settings</a>
              <a href="#" onClick={(e) => logout()}>
                Log Out{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Person;
