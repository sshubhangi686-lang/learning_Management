 // src/screen/dashboard/course/CourseUpdate.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { updateItem } from "../../../config/LocalStorageMethods";
import "../../../style/createCourse.css"; // reuse form styles

export default function CourseUpdate() {
  const [data, setData] = useState({
    courseName: "",
    courseDuration: "",
    noOfQuiz: "",
    description: "",
    topics: "",
    key: "",
    image: "",
  });
  const [waiting, setWaiting] = useState("");
  const [currentImage, setCurrentImage] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const stateData = { ...location.state };
      // If topics is an array, convert to comma-separated string for editing
      if (Array.isArray(stateData.topics)) {
        stateData.topics = stateData.topics.join(", ");
      }
      setData(stateData);
    }
  }, [location.state]);

  const currentV = (e) => {
    const { value, name } = e.target;
    setData((val) => ({ ...val, [name]: value }));
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    setWaiting("waiting...");

    try {
      let updatedData = { ...data };

      // Convert topics string back into array
      updatedData.topics = data.topics
        ? data.topics.split(",").map((t) => t.trim())
        : [];

      if (currentImage) {
        // ✅ Convert file to base64 before saving
        const reader = new FileReader();
        reader.onload = async (ev) => {
          updatedData.image = ev.target.result;
          await updateItem(updatedData, "course", data.key);
          setWaiting("");
          alert("Successfully updated with new image");
        };
        reader.readAsDataURL(currentImage);
      } else {
        // ✅ No new image, just update other fields
        await updateItem(updatedData, "course", data.key);
        setWaiting("");
        alert("Successfully updated");
      }
    } catch (err) {
      console.log(err);
      setWaiting("");
      alert("Error updating course");
    }
  };

  return (
    <section className="create-course">
      <form className="course-form" onSubmit={updateCourse}>
        <input
          type="text"
          name="courseName"
          placeholder="Enter Course Name"
          value={data.courseName}
          onChange={currentV}
          className="form-input"
        />
        <input
          type="number"
          name="courseDuration"
          placeholder="Enter course duration (months)"
          value={data.courseDuration}
          onChange={currentV}
          className="form-input"
        />
        <input
          type="number"
          name="noOfQuiz"
          placeholder="Enter no of quiz"
          value={data.noOfQuiz}
          onChange={currentV}
          className="form-input"
        />

        <textarea
          name="description"
          placeholder="Enter course description"
          value={data.description}
          onChange={currentV}
          className="form-textarea"
        />

        <textarea
          name="topics"
          placeholder="Enter topics (comma separated)"
          value={data.topics}
          onChange={currentV}
          className="form-textarea"
        />

        <input
          type="file"
          onChange={(e) => setCurrentImage(e.target.files[0])}
          className="form-file"
        />

        <button type="submit" className="form-btn">
          {waiting || "Update Course"}
        </button>
      </form>
    </section>
  );
}
