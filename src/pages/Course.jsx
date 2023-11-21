import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Person from "../component/Person";
import { FileUploader } from "react-drag-drop-files";
import JoditEditor from "jodit-react";
import { Notyf } from "notyf";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
function Course() {
  const [file, setFile] = useState(null);
  const [image, setImg] = useState("");
  const [courseCate, setCate] = useState([]);
  const url = "http://127.0.0.1:8000/api/";
  const [coursename, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [summary, setSummary] = useState("");
  const [grade, setGrade] = useState("");
  const [idCate, setIdCate] = useState(0);
  const [module, setModule] = useState([{ name: "", content: "" }]);
  const [addCourse, setAddcourse] = useState(false);
  const [courses, setCourses] = useState([]);

  // ==============================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ======================================
  const AddOnModule = () => {
    setModule([...module, { name: "", content: "" }]);
  };
  const handleChange = (file) => {
    var url1 = URL.createObjectURL(file);
    setImg(url1);
    setFile(file);
  };
  const removeModule = (index) => {
    if (index > -1) {
      var module1 = [...module];
      module1.splice(index, 1);
      setModule(module1);
    }
  };
  const notyfB = new Notyf({
    duration: 1000,
    position: {
      x: "right",
      y: "bottom",
    },
    types: [
      {
        type: "warning",
        background: "orange",
        icon: {
          className: "material-icons",
          tagName: "i",
          text: "warning",
        },
      },
      {
        type: "error",
        background: "indianred",
        duration: 2000,
        dismissible: true,
      },
    ],
  });
  const submitCourse = () => {
    if (coursename == "") {
      notyfB.open({
        type: "error",
        message: "Chưa có tên khoá học",
      });
    } else if (summary == "") {
      notyfB.open({
        type: "error",
        message: "Chưa có tóm tắt thông tin khoá học",
      });
    } else if (grade == "") {
      notyfB.open({
        type: "error",
        message: "Chưa có lớp",
      });
    } else if (idCate == 0) {
      notyfB.open({
        type: "error",
        message: "Chưa chọn loại hình lớp",
      });
    } else if (
      module.length == 0 ||
      module[0].name == "" ||
      module[0].content == ""
    ) {
      notyfB.open({
        type: "error",
        message: "Chưa tạo module khoá học",
      });
    } else if (file == null) {
      notyfB.open({
        type: "error",
        message: "Chưa có hình",
      });
    } else {
      var formData = new FormData();
      var module1 = JSON.stringify(module);
      formData.append("coursename", coursename);
      formData.append("summary", summary);
      formData.append("grade", grade);
      formData.append("idCate", idCate);
      formData.append("discount", discount);
      formData.append("file", file);
      formData.append("module", module1);
      axios
        .post(url + "course", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.check == true) {
            notyfA.open({
              type: "success",
              message: "Đã thêm thành công",
            });
            setFile(null);
            setImg("");
            setName("");
            setDiscount(0);
            setSummary("");
            setGrade("");
            setIdCate(0);
            setModule([]);
            setCourses(res.data.result);
            setAddcourse(false);
          } else if (res.data.check == false) {
            if (res.data.msg.coursename) {
              notyfA.open({
                type: "error",
                message: res.data.msg.coursename,
              });
            } else if (res.data.msg.summary) {
              notyfA.open({
                type: "error",
                message: res.data.msg.summary,
              });
            } else if (res.data.msg.grade) {
              notyfA.open({
                type: "error",
                message: res.data.msg.grade,
              });
            } else if (res.data.msg.idCate) {
              notyfA.open({
                type: "error",
                message: res.data.msg.idCate,
              });
            } else if (res.data.msg.discount) {
              notyfA.open({
                type: "error",
                message: res.data.msg.discount,
              });
            } else if (res.data.msg.file) {
              notyfA.open({
                type: "error",
                message: res.data.msg.file,
              });
            } else if (res.data.msg.module) {
              notyfA.open({
                type: "error",
                message: res.data.msg.module,
              });
            }
          }
        })
        .catch((error) => {
          // handle errors
          console.log(error);
        });
    }
  };
  const notyfA = new Notyf({
    duration: 1000,
    position: {
      x: "right",
      y: "top",
    },
    types: [
      {
        type: "warning",
        background: "orange",
        icon: {
          className: "material-icons",
          tagName: "i",
          text: "warning",
        },
      },
      {
        type: "error",
        background: "indianred",
        duration: 2000,
        dismissible: true,
      },
    ],
  });

  const fileTypes = [
    "gif",
    "jpeg",
    "png",
    "webp",
    "jpg",
    "JPG",
    "jfif",
    "GIF",
    "JPEG",
    "PNG",
    "WEBP",
  ];
  const setModuleName = (index, name) => {
    var module1 = [...module];
    module1[index]["name"] = name;
    setModule(module1);
    console.log(module);
  };
  const setModuleContent = (index, value) => {
    var module1 = [...module];
    module1[index]["content"] = value;
    setModule(module1);
    console.log(module);
  };
  const switchCourse = (id, status) => {
    axios
      .post(url + "switchCourse", {
        id: id,
        status: status,
      })
      .then(function (res) {
        if (res.data.check == true) {
          notyfA.open({
            type: "success",
            message: "Cập nhật trạng thái thành công",
          });
          setCourses(res.data.result);
        } else if (res.data.check == false) {
          if (res.data.msg.id) {
            notyfA.open({
              type: "error",
              message: res.data.msg.id,
            });
          } else if (res.data.msg.status) {
            notyfA.open({
              type: "error",
              message: res.data.msg.status,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [add, setadd] = useState(false);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [idCourse, setIdCourse] = useState(0);
  const [courseDuration, setCourseDuration] = useState([]);
  const setAddPrice = (id) => {
    fetch(url + "getCoursePrice/" + id)
      .then((res) => res.json())
      .then((res) => {
        setCourseDuration(res);
      });
    setIdCourse(id);
    handleShow();
  };
  const addCoursePrice = () => {
    if (duration == 0) {
      notyfA.open({
        type: "info",
        message: "Thiếu thời lượng học",
      });
    } else if (price == 0) {
      notyfA.open({
        type: "info",
        message: "Thiếu giá khoá học",
      });
    } else {
      axios
        .post(url + "createPrice", {
          duration: duration,
          price: price,
          id: idCourse,
        })
        .then(function (res) {
          if (res.data.check == true) {
            notyfA.open({
              type: "success",
              message: "Thêm giá học phần thành công",
            });
            setCourseDuration(res.data.result);
            setDuration(0);
            setPrice(0);
          } else if (res.data.check == false) {
            if (res.data.msg.id) {
              notyfA.open({
                type: "error",
                message: res.data.msg.id,
              });
            } else if (res.data.msg.price) {
              notyfA.open({
                type: "error",
                message: res.data.msg.price,
              });
            } else if (res.data.msg.duration) {
              notyfA.open({
                type: "error",
                message: res.data.msg.duration,
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
    fetch(url + "activeCate")
      .then((res) => res.json())
      .then((res) => {
        setCate(res);
      });
    fetch(url + "courses")
      .then((res) => res.json())
      .then((res) => {
        setCourses(res);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thời lượng khoá học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {courseDuration.length > 0 &&
              courseDuration.map((item, index) => (
                <div key={index} className="input-group mb-3">
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    value={
                      JSON.stringify(item.duration) +
                      "h-" +
                      JSON.stringify(item.price)
                    }
                  />
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    id="button-addon2"
                  >
                    Xoá
                  </button>
                </div>
              ))}
            <hr />
          </div>
          <div className="row">
            <div className="col">
              <label>Thời lượng</label>
              <input
                type="number"
                placeholder="Số buổi học"
                className="form-control mb-2"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <label>Giá</label>
              <input
                type="number"
                placeholder="Giá khoá học"
                className="form-control mt-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <button
                className="btn-sm mt-2 btn-primary"
                onClick={(e) => addCoursePrice()}
              >
                Thêm
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
                    onClick={(e) => {
                      setAddcourse(true);
                    }}
                  >
                    Thêm
                  </button>
                  <button
                    className="btn btn-secondary ms-2"
                    onClick={(e) => {
                      setAddcourse(false);
                    }}
                  >
                    Huỷ
                  </button>
                </div>
                <Person />
              </div>
            </div>
          </div>
          {addCourse && (
            <div className="row container ms-3">
              <div className="row mt-2">
                <div className="col-md-6 mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên khoá học"
                    value={coursename}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Giảm giá"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tóm tắt khoá học"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lớp"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <select
                    name=""
                    className="form-control"
                    value={idCate}
                    onChange={(e) => setIdCate(e.target.value)}
                    defaultValue={0}
                    id=""
                  >
                    <option value="0" disabled>
                      Chọn loại hình lớp học
                    </option>
                    {courseCate.length > 0 &&
                      courseCate.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md ms-1">
                  <FileUploader
                    handleChange={handleChange}
                    name="file"
                    mulitple="false"
                    types={fileTypes}
                  />
                  <img
                    style={{ height: "250px", width: "autoo" }}
                    src={image}
                    alt=""
                  />
                </div>
              </div>
              <div className="row mt-3">
                <h5>Module</h5>
                {module.length > 0 &&
                  module.map((item, index) => (
                    <div key={index} className="row mb-3">
                      <div className="col-md">
                        <input
                          type="text"
                          placeholder="Tên Module"
                          className="form-control mb-3"
                          onChange={(e) => setModuleName(index, e.target.value)}
                        />
                        <JoditEditor
                          tabIndex={1} // tabIndex of textarea
                          // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                          onBlur={(newContent) =>
                            setModuleContent(index, newContent)
                          }
                        />
                        <button
                          className="btn btn-danger mt-2"
                          onClick={(e) => removeModule(index)}
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="row mt-2">
                <div className="col-md-4">
                  <button
                    className="btn btn-success"
                    onClick={(e) => AddOnModule()}
                  >
                    Thêm module
                  </button>
                  <button
                    className="btn btn-primary ms-3"
                    onClick={(e) => submitCourse()}
                  >
                    Thêm khoá học
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="row ms-3 container-fluid">
            {!addCourse && courses.length > 0 && (
              <div className="table-responsive">
                <table className="table table-primary">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tên khoá học</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Ngày tạo</th>
                      <th scope="col">Tuỳ chỉnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((item, index) => (
                      <tr className="">
                        <td scope="row">{++index}</td>
                        <td>{item.name}</td>
                        <td>
                          <select
                            name=""
                            defaultValue={item.status}
                            className="form-control"
                            onChange={(e) =>
                              switchCourse(item.id, e.target.value)
                            }
                            id=""
                          >
                            <option value="0">Đang khoá</option>
                            <option value="1">Đang mở</option>
                          </select>
                        </td>
                        <td>{item.created_at}</td>
                        <td>
                          <a
                            style={{ textDecoration: "none" }}
                            href={"/editCourse/" + item.id}
                            className="btn-sm p-2 btn-warning"
                          >
                            Sửa
                          </a>
                          <button className="btn-sm btn-danger ms-3">
                            Xoá
                          </button>
                          <button
                            className="btn-sm btn-success ms-3"
                            onClick={(e) => setAddPrice(item.id)}
                          >
                            Thời lượng
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
