import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../config/FirebaseMethods"; // now localStorage methods

import "../../style/login.scss";

export default function Login() {
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
    signInUser(currentValue)
      .then((msg) => {
        alert(msg);
        setError("");
        setLoading("");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        setError(err);
        setLoading("");
      });
  };

  return (
    <section className="login">
      <div className="heading">
        <h1>Login</h1>
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

        <div className="buttonPart">
          {error && <p className="error">{error}</p>}
        </div>

        <button type="submit">{loading || "Login"}</button>
      </form>

      <div className="switchPage">
         <Link to="/landing?mode=signup">Signup</Link>
      </div>
    </section>
  );
}
