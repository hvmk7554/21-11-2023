import React, { useEffect, useState } from "react";

function Sidebar() {
  const [page, setPage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.replace("/");
    }
    setPage(window.location.pathname);
  }, []);
  return (
    <>
      <nav className="sidebar">
        <div className="logo d-flex justify-content-between">
          <a href="index-2.html">
            <img src="/img/logo.png" alt="" />
          </a>
          <div className="sidebar_close_icon d-lg-none">
            <i className="ti-close" />
          </div>
        </div>
        <ul id="sidebar_menu">
          <li className="">
            <a className="has-arrow" href="#" aria-expanded="false">
              <img src="/img/menu-icon/dashboard.svg" alt="" />
              <span>Dashboard</span>
            </a>
          </li>

          <li
            className={
              page == "/education" || page == "/edu/:id" ? "mm-active" : ""
            }
          >
            <a className="has-arrow" href="/education" aria-expanded="false">
              <img src="/img/menu-icon/2.svg" alt="" />
              <span>Education</span>
            </a>
          </li>
          <li className="">
            <a className="has-arrow" href="#" aria-expanded="false">
              <img src="/img/menu-icon/3.svg" alt="" />
              <span>Applications</span>
            </a>
          </li>
          <li className="">
            <a className="has-arrow" href="#" aria-expanded="false">
              <img src="/img/menu-icon/4.svg" alt="" />
              <span>Components</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
