import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Education from "./pages/Education";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import CourseCate from "./pages/CourseCate";
import Course from "./pages/Course";
import EditCourse from "./pages/EditCourse";
function App() {
  if (!localStorage.getItem('user')) {
    return <Login />
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/education" element={<Education />} />
        <Route path="/education/:id" element={<CourseCate />} />
        <Route path="/editCourse/:id" element={<EditCourse />} />
        <Route path="/cate/:id" element={<Course />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
