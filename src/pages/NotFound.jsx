import React from "react";
import Icon from "../component/Icon";
import "../component/icon.css";
function NotFound() {
  return (
    <>
      <div className="container text-center">
        <div className="row row-cols-1 row-cols-xl-2 justify-content-center">
          <div className="col mt-5 mt-sm-0 mt-xl-5">
            <Icon />
            <a className="btn btn-danger mt-2" href="/">
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
