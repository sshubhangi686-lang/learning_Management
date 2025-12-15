import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../config/FirebaseMethods"; // now localStorage methods

import "../../style/login.scss";

export default function SignUp() {
  const [currentValue, setCurrentValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const currentV = (e) => {
    const { value, name } = e.target;
    setCurrentValue((val) => ({ ...val, [name]: value }));
  };

  const userData = (e) => {
    e.preventDefault();
    setLoading("waiting...");
    createUser(currentValue)
      .then(() => {
        alert("Successfully created");
        setError("");
        setLoading("");
        navigate("/login");
      })
      .catch((err) => {
        setError(err);
        setLoading("");
      });
  };

  return (
    <section className="SignUp">
      <div className="heading">
        <h1>SignUp</h1>
      </div>

      <form onSubmit={userData}>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={currentV}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={currentV}
          required
        />

        <button type="submit">{loading || "Sign up"}</button>
      </form>

      <div className="buttonPart">
        {error && <p className="error">{error}</p>}
      </div>

      <div className="switchPage">
         <Link to="/landing?mode=login">Login</Link>
      </div>
    </section>
  );
}
