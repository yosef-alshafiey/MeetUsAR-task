import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import "../styles/LoginForm.css";
import { FaEnvelope, FaLock } from "react-icons/fa"; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, error } = useAuthStore();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    await login(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="header-text">Welcome back</h1>
        <p className="txt">
          Step into our shopping metaverse for an unforgettable shopping
          experience
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="input-wrapper">
              <FaEnvelope className="icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="Email"
              />
            </div>
            {emailError && <span className="error">{emailError}</span>}
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <FaLock className="icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Password"
              />
            </div>
            {passwordError && <span className="error">{passwordError}</span>}
          </div>

          {error && <span className="error">{error}</span>}
          <button
            type="submit"
            disabled={!email || !password || !validateEmail(email)}
          >
            Login
          </button>
          <p
            style={{ marginTop: "1rem", color: "#62626B", textAlign: "center" }}
          >
            Don't have an account?{" "}
            <a
              style={{
                textDecoration: "underline",
                color: "#62626B",
                cursor: "pointer",
              }}
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
