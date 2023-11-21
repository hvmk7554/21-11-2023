import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios, { Axios } from "axios";
import { Notyf } from "notyf";
import Swal from "sweetalert2";
import "notyf/notyf.min.css";
import { setLogout } from "../redux/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Education() {
  const dispatch = useDispatch();
  const [showEdu, setShow] = useState(false);
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
  const logout = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }
    window.location.replace("/");
  };
  const handleCloseEducation = () => setShow(false);
  const handleShowEducation = () => setShow(true);
  const [education, setEdu] = useState("");
  const [editEdu, setEdit] = useState(false);
  const [educations, setEducation] = useState([]);
  const [editId, setID] = useState(0);
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLast] = useState(1);
  const url = "http://127.0.0.1:8000/api/";
  const submitAddMenu = () => {
    if (education == "") {
      notyfR.open({
        type: "error",
        message: "Thiếu tên loại hình giáo dục",
      });
    } else {
      axios
        .post(url + "createEdu", {
          name: education,
        })
        .then(function (res) {
          if (res.data.check == true) {
            notyfR.open({
              type: "success",
              message: "Thêm thành công",
            });
            setEducation(res.data.edu.data);
            setEdu("");
            handleCloseEducation();
            var arr = [];
            if (res.last_page > 1) {
              for (let i = 1; i < res.data.edu.last_page + 1; i++) {
                arr.push(i);
              }
              setPagination(arr);
            }
          } else {
            if (res.data.msg.name) {
              notyfR.open({
                type: "error",
                message: res.data.msg.name,
              });
              setEdu("");
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const setEditEdu = (id, name) => {
    setEdu(name);
    setEdit(true);
    setID(id);
    handleShowEducation();
  };
  const setAddEdu = () => {
    setEdu("");
    handleShowEducation();
  };
  const switchEdu = (id, status) => {
    var status = Number(status);
    axios
      .post(url + "switchEdu", {
        id: id,
        status: status,
      })
      .then(function (res) {
        if (res.data.check == true) {
          notyfR.open({
            type: "success",
            message: "Thay đổi thành công",
          });
          setEducation(res.data.edu.data);
          setEdu("");
          var arr = [];
          setLast(res.data.edu.last_page);
          if (res.last_page > 1) {
            for (let i = 1; i < res.data.edu.last_page + 1; i++) {
              arr.push(i);
            }
            setPagination(arr);
            setPage(1);
          }
          document.querySelector(".page-link").removeClass("active");
        } else if (res.data.check == false) {
          if (res.data.msg.id) {
            notyfR.open({
              type: "error",
              message: res.data.msg.id,
            });
          } else if (res.data.msg) {
            notyfR.open({
              type: "error",
              message: res.data.msg,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteEduCation = (id) => {
    Swal.fire({
      icon: "question",
      text: "Xoá loại hình đào tạo?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(url + "deleteEdu", {
            id: id,
          })
          .then(function (res) {
            if (res.data.check == true) {
              notyfR.open({
                type: "success",
                message: "Xoá thành công",
              });
              setEducation(res.data.edu.data);
              setEdu("");
              document.querySelectorAll(".page-link").removeClass("active");
            } else if (res.data.check == false) {
              if (res.data.msg.id) {
                notyfR.open({
                  type: "error",
                  message: res.data.msg.id,
                });
              } else if (res.data.msg) {
                notyfR.open({
                  type: "error",
                  message: res.data.msg,
                });
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };
  const submitEditEdu = () => {
    if (editId == 0) {
      notyfR.open({
        type: "error",
        message: "Thiếu mã loại hình giáo dục",
      });
    } else if (education == "") {
      notyfR.open({
        type: "error",
        message: "Thiếu tên loại hình giáo dục",
      });
    } else {
      axios
        .post(url + "editEdu", {
          id: editId,
          name: education,
        })
        .then(function (res) {
          if (res.data.check == true) {
            notyfR.open({
              type: "success",
              message: "Thay đổi thành công",
            });
            setEducation(res.data.edu.data);
            setEdu("");
            handleCloseEducation();
            setEdit(false);
            var arr = [];
            if (res.last_page > 1) {
              for (let i = 1; i < res.data.edu.last_page + 1; i++) {
                arr.push(i);
              }
              setPagination(arr);
            }
            document.querySelectorAll(".page-link").removeClass("active");
          } else if (res.data.check == false) {
            if (res.data.msg.id) {
              notyfR.open({
                type: "error",
                message: res.data.msg.id,
              });
            } else if (res.data.msg.name) {
              notyfR.open({
                type: "error",
                message: res.data.msg.name,
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    fetch(url + "edu?page=" + page)
      .then((res) => res.json())
      .then((res) => {
        setEducation(res.data);
        var arr = [];
        if (res.last_page > 1) {
          for (let i = 1; i < res.last_page + 1; i++) {
            arr.push(i);
          }
          setPagination(arr);
        }
      });
  }, [page]);
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
                  <button
                    className="btn btn-primary"
                    onClick={(e) => setAddEdu()}
                  >
                    Thêm
                  </button>
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
                        <a href="#" onClick={(e) => logout()}>
                          Log Out{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal show={showEdu} onHide={handleCloseEducation}>
            <Modal.Header closeButton>
              <Modal.Title>Loại hình giáo dục</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                placeholder="Loại hình giáo dục"
                className="form-control"
                value={education}
                onChange={(e) => setEdu(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEducation}>
                Đóng
              </Button>
              {!editEdu && (
                <Button variant="primary" onClick={submitAddMenu}>
                  Lưu
                </Button>
              )}
              {editEdu && (
                <Button variant="primary" onClick={submitEditEdu}>
                  Sửa
                </Button>
              )}
            </Modal.Footer>
          </Modal>
          <div className="container mt-3">
            {educations.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-primary">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tên loại hình</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Ngày tạo</th>
                      <th scope="col">Xoá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {educations.map((item, index) => (
                      <tr key={index} className="">
                        <td className="align-middle" scope="row">
                          {++index}
                        </td>
                        <td className="align-middle">
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={(e) => setEditEdu(item.id, item.name)}
                          >
                            {item.name}
                          </span>
                        </td>
                        <td className="align-middle">
                          <select
                            name=""
                            defaultValue={item.status}
                            className="form-control"
                            id=""
                            onChange={(e) => switchEdu(item.id, e.target.value)}
                          >
                            <option value={0}>Đang khoá</option>
                            <option value={1}>Đang mở</option>
                          </select>
                        </td>
                        <td className="align-middle">{item.created_at}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => deleteEduCation(item.id)}
                          >
                            Xoá
                          </button>
                          <a
                            href={`/education/${item.id}`}
                            className="ms-3 btn btn-success"
                          >
                            Chi tiết
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
            <nav aria-label="...">
              <ul className="pagination">
                {pagination.length > 1 &&
                  pagination.map((index, item) => (
                    <li key={index} className="page-item">
                      <a
                        className={
                          item + 1 == page ? "page-link active" : "page-link"
                        }
                        onClick={(e) => setPage(item)}
                        href="#"
                      >
                        {++item}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Education;
