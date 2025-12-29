 // src/screen/dashboard/course/CreateCourse.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../config/LocalStorageMethods";
import "../../../style/createCourse.css";  

export default function CreateCourse() {
  const [currentImage, setCurrentImage] = useState("");
  const [data, setData] = useState({
    courseName: "",
    courseDuration: "",
    noOfQuiz: "",
    description: "",
    topics: ""
  });
  const [waiting, setWaiting] = useState("");
  const navigate = useNavigate();

  const currentV = (e) => {
    const { value, name } = e.target;
    setData((val) => ({ ...val, [name]: value }));
  };

  const saveCourse = (e) => {
    e.preventDefault();

    const topicsArray = data.topics
      ? data.topics.split(",").map((t) => t.trim())
      : [];

    const newCourse = { ...data, topics: topicsArray };

    setWaiting("waiting...");
    uploadImage(currentImage, "images", newCourse, "course")
      .then(() => {
        setWaiting("");
        alert("Successfully Added");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setWaiting("");
      });
  };

  return (
    <section className="create-course">
      <form className="course-form" onSubmit={saveCourse}>
        <input
          type="text"
          name="courseName"
          placeholder="Enter Course Name"
          onChange={currentV}
          value={data.courseName}
          className="form-input"
        />
        <input
          type="number"
          name="courseDuration"
          placeholder="Enter course duration (months)"
          onChange={currentV}
          value={data.courseDuration}
          className="form-input"
        />
        <input
          type="number"
          name="noOfQuiz"
          placeholder="Enter no of quiz"
          onChange={currentV}
          value={data.noOfQuiz}
          className="form-input"
        />

        <textarea
          name="description"
          placeholder="Enter course description"
          onChange={currentV}
          value={data.description}
          className="form-textarea"
        />

        <textarea
          name="topics"
          placeholder="Enter topics (comma separated)"
          onChange={currentV}
          value={data.topics}
          className="form-textarea"
        />

        <input
          type="file"
          onChange={(e) => setCurrentImage(e.target.files[0])}
          className="form-file"
        />

        <button type="submit" className="form-btn">
          {waiting || "Add Course"}
        </button>
      </form>
    </section>
  );
}
