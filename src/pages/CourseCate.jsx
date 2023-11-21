import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import Swal from "sweetalert2";
import axios from "axios";
import Person from "../component/Person";
function CourseCate() {
  const { id } = useParams();
  const [show, setShow] = useState(false);
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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [coursecate, setCourseCate] = useState("");
  const [cate, setCate] = useState([]);
  const setAdd = () => {
    setCourseCate("");
    setShow(true);
  };
  const [idCate, setIdCate] = useState(0);
  const url = "http://127.0.0.1:8000/api/";

  const submitAddCate = () => {
    if (coursecate == "") {
      notyfR.open({
        type: "error",
        message: "Thiếu tên loại hình lớp học",
      });
    } else {
      axios
        .post(url + "createCourseCate", {
          name: coursecate,
          idEdu: id,
        })
        .then(function (res) {
          if (res.data.check == true) {
            notyfR.open({
              type: "success",
              message: "Thêm thành công",
            });
            setCate(res.data.result);
            setCourseCate("");
            setShow(false);
          } else if (res.data.check == false) {
            if (res.data.msg.name) {
              notyfR.open({
                type: "error",
                message: res.data.msg.name,
              });
            } else if (res.data.msg.idEdu) {
              notyfR.open({
                type: "error",
                message: res.data.msg.idEdu,
              });
            }
          }
        });
    }
  };
  const setEdit = (id, old) => {
    setCourseCate(old);
    setIdCate(id);
    handleShow();
  };
  //========================
  const switchCate = (idSwitch, status) => {
    Swal.fire({
      icon: "question",
      text: "Thay đôi trạng thái loại hình giáo dục?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Đúng",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(url + "switchCate", {
            status: status,
            id: idSwitch,
          })
          .then(function (res) {
            if (res.data.check == true) {
              notyfR.open({
                type: "success",
                message: "Sửa thành công",
              });
              setCate(res.data.result);
              setCourseCate("");
              setShow(false);
            } else if (res.data.check == false) {
              if (res.data.msg.status) {
                notyfR.open({
                  type: "error",
                  message: res.data.msg.status,
                });
              } else if (res.data.msg.id) {
                notyfR.open({
                  type: "error",
                  message: res.data.msg.id,
                });
              }
            }
          });
      } else if (result.isDenied) {
      }
    });
  };
  //=======================
  const deleteCate = (idD) => {
    Swal.fire({
      icon: "question",
      text: "Xoá loại lớp này ?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Đúng",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(url + "DelCate", {
            idD: idD,
          })
          .then(function (res) {
            if (res.data.check == true) {
              notyfR.open({
                type: "success",
                message: "Xoá thành công",
              });
              setCate(res.data.result);
              setCourseCate("");
              setShow(false);
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
          });
      }
    });
  };
  //========================
  const submitEditCate = () => {
    if (coursecate == "") {
      notyfR.open({
        type: "error",
        message: "Thiếu loại lớp học",
      });
    } else if (idCate == 0) {
      notyfR.open({
        type: "error",
        message: "Thiếu mã loại lớp học",
      });
    } else {
      axios
        .post(url + "editCourseCate", {
          name: coursecate,
          id: idCate,
        })
        .then(function (res) {
          if (res.data.check == true) {
            notyfR.open({
              type: "success",
              message: "Sửa thành công",
            });
            setCate(res.data.result);
            setCourseCate("");
            setShow(false);
            setIdCate(0);
          } else if (res.data.check == false) {
            if (res.data.msg.name) {
              notyfR.open({
                type: "error",
                message: res.data.msg.name,
              });
            } else if (res.data.msg.id) {
              notyfR.open({
                type: "error",
                message: res.data.msg.id,
              });
            }
          }
        });
    }
  };
  useEffect(() => {
    fetch(url + "getCourseCate/" + id)
      .then((res) => res.json())
      .then((res) => {
        setCate(res);
      });
  }, []);
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
                  <button className="btn btn-primary" onClick={(e) => setAdd()}>
                    Thêm
                  </button>
                </div>
                <Person />
              </div>
            </div>
          </div>
          {/* =========================== */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Loại hình lớp học</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label className="form-label">Loại hình :</label>
                <input
                  type="text"
                  className="form-control"
                  name=""
                  id=""
                  value={coursecate}
                  placeholder="Loại hình lớp học"
                  onChange={(e) => setCourseCate(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {idCate == 0 && (
                <Button variant="primary" onClick={(e) => submitAddCate()}>
                  Lưu
                </Button>
              )}
              {idCate != 0 && (
                <Button variant="warning" onClick={(e) => submitEditCate()}>
                  Sửa
                </Button>
              )}
            </Modal.Footer>
          </Modal>
          {cate.length > 0 && (
            <div className="mt-3  container">
              <div className="table-responsive">
                <table className="table table-primary">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tên loại lớp học</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Ngày tạo</th>
                      <th scope="col">Xoá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cate.map((item, index) => (
                      <tr key={index} className="">
                        <td scope="row">{++index}</td>
                        <td>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={(e) => setEdit(item.id, item.name)}
                          >
                            {item.name}
                          </span>
                        </td>
                        <td>
                          <select
                            name=""
                            defaultValue={item.status}
                            className="form-control"
                            id=""
                            onChange={(e) =>
                              switchCate(item.id, e.target.value)
                            }
                          >
                            <option value="0">Đang khoá</option>
                            <option value="1">Đang mở</option>
                          </select>
                        </td>
                        <td>{item.created_at}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => deleteCate(item.id)}
                          >
                            Xoá
                          </button>
                          <a
                            href={`/cate/${item.id}`}
                            className="btn btn-success ms-3"
                          >
                            Xem thêm
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CourseCate;
