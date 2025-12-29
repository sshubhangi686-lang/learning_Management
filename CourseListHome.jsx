import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getItem } from "../../../config/LocalStorageMethods"; // localStorage methods
import "../../../style/studentRegistrationList.css";

export default function CourseListHome() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getItem("course")
      .then((courses) => {
        const arr = Object.values(courses);
        setData(arr);
      })
      .catch((err) => console.log(err));
  }, []);

 const deleteCourse = (course, index) => {
  const confirmDelete = window.confirm("Do you want to delete this course?");
  if (!confirmDelete) {
    return; // stop if user clicks Cancel
  }

  deleteItem("course", course.key)
    .then((msg) => {
      console.log(msg);
      setData((val) => val.filter((_, i) => i !== index));
    })
    .catch((err) => console.log(err));
};


  return (
    <section className="CourseList">
      <div className="heading">
        <h1>Course List</h1>
      </div>

      <div className="table">
        <table style={{ border: "2px solid black", width: "100%",borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Duration</th>
              <th>No. of Quiz</th>
              <th>Image</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseName}</td>
                  <td>{course.courseDuration} Month</td>
                  <td>{course.noOfQuiz} Quiz</td>
                  <td>
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.courseName}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => deleteCourse(course, index)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        navigate("course-update", { state: course })
                      }
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
