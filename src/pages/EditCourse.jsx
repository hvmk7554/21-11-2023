import { Notyf } from "notyf";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Person from "../component/Person";
import Sidebar from "../component/Sidebar";
import { FileUploader } from "react-drag-drop-files";
import JoditEditor from "jodit-react";
import axios from "axios";
function EditCourse() {
  const [file, setFile] = useState(null);
  const [image, setImg] = useState("");
  const [courseCate, setCate] = useState([]);
  const url = "http://127.0.0.1:8000/api/";
  const url1 = "http://127.0.0.1:8000/images/";
  const [coursename, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [summary, setSummary] = useState("");
  const { id } = useParams();
  const [grade, setGrade] = useState("");
  const [idCate, setIdCate] = useState(0);
  const [module, setModule] = useState([{ name: "", content: "" }]);
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
      y: "top",
    },
    types: [
      {
        type: "warning",
        background: "red",
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
  const navigate = useNavigate();
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
      var formData = new FormData();
      var module1 = JSON.stringify(module);
      formData.append("id", id);
      formData.append("coursename", coursename);
      formData.append("summary", summary);
      formData.append("grade", grade);
      formData.append("idCate", idCate);
      formData.append("discount", discount);
      formData.append("module", module1);
      axios
        .post(url + "editcourse", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.check == true) {
            notyfB.open({
              type: "success",
              message: "Đã sửa thành công",
            });
            navigate(-1);
          } else if (res.data.check == false) {
            if (res.data.msg.coursename) {
              notyfB.open({
                type: "error",
                message: res.data.msg.coursename,
              });
            } else if (res.data.msg.summary) {
              notyfB.open({
                type: "error",
                message: res.data.msg.summary,
              });
            } else if (res.data.msg.grade) {
              notyfB.open({
                type: "error",
                message: res.data.msg.grade,
              });
            } else if (res.data.msg.idCate) {
              notyfB.open({
                type: "error",
                message: res.data.msg.idCate,
              });
            } else if (res.data.msg.discount) {
              notyfB.open({
                type: "error",
                message: res.data.msg.discount,
              });
            } else if (res.data.msg.file) {
              notyfB.open({
                type: "error",
                message: res.data.msg.file,
              });
            } else if (res.data.msg.module) {
              notyfB.open({
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
    } else {
      var formData = new FormData();
      var module1 = JSON.stringify(module);
      formData.append("id", id);
      formData.append("coursename", coursename);
      formData.append("summary", summary);
      formData.append("grade", grade);
      formData.append("idCate", idCate);
      formData.append("discount", discount);
      formData.append("file", file);
      formData.append("module", module1);
      axios
        .post(url + "editcourse2", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.check == true) {
            notyfB.open({
              type: "success",
              message: "Đã sửa thành công",
            });
            navigate(-1);
          } else if (res.data.check == false) {
            if (res.data.msg.coursename) {
              notyfB.open({
                type: "error",
                message: res.data.msg.coursename,
              });
            } else if (res.data.msg.summary) {
              notyfB.open({
                type: "error",
                message: res.data.msg.summary,
              });
            } else if (res.data.msg.grade) {
              notyfB.open({
                type: "error",
                message: res.data.msg.grade,
              });
            } else if (res.data.msg.idCate) {
              notyfB.open({
                type: "error",
                message: res.data.msg.idCate,
              });
            } else if (res.data.msg.discount) {
              notyfB.open({
                type: "error",
                message: res.data.msg.discount,
              });
            } else if (res.data.msg.file) {
              notyfB.open({
                type: "error",
                message: res.data.msg.file,
              });
            } else if (res.data.msg.module) {
              notyfB.open({
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
  useEffect(() => {
    fetch(url + "activeCate")
      .then((res) => res.json())
      .then((res) => {
        setCate(res);
      });
    fetch(url + "singleCourse/" + id)
      .then((res) => res.json())
      .then((res) => {
        setName(res.name);
        setImg(url1 + res.image);
        setIdCate(res.idCourseCate);
        setSummary(res.summary);
        setGrade(res.Grade);
        setDiscount(res.discount);
        var module1 = JSON.parse(res.detail);
        setModule(module1);
      });
  }, [id]);
  return (
    <div>
      <Sidebar />

      <div className="main_content dashboard_part">
        <div className="container-fluid g-0">
          <div className="row">
            <div className="col-lg-12 p-0 ">
              <div className="header_iner d-flex justify-content-between align-items-center">
                <div className="sidebar_icon d-lg-none">
                  <i className="ti-menu" />
                </div>
                <div className="serach_field-area"></div>
                <Person />
              </div>
            </div>
          </div>
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
                  defaultValue={idCate}
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
                        value={item.name}
                        onChange={(e) => setModuleName(index, e.target.value)}
                      />
                      <JoditEditor
                        tabIndex={1} // tabIndex of textarea
                        // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onBlur={(newContent) =>
                          setModuleContent(index, newContent)
                        }
                        value={item.content}
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
                  Sửa khoá học
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
