import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function AuthPage() {

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleAuth = () => {
         if (!email.includes("@")) {
  alert("Enter valid email");
  return;
}

if (password.length < 6) {
  alert("Password must be 6+ characters");
  return;
}



    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => navigate("/dashboard"))
        .catch((err) => alert(err.message));
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("Account Created");
          setIsLogin(true);
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT */}
      <div className="auth-left">
        <h2>Profolio</h2>
        <p>Build Career. Build Future.</p>
      </div>

      {/* RIGHT */}
      <div className="auth-right">

        <h1>{isLogin ? "Login" : "Create Account"}</h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD WITH TOGGLE */}
        <div className="password-box">

          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>

        </div>

        <button className="auth-btn" onClick={handleAuth}>
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p className="toggle-text">
          {isLogin ? "Don't have account?" : "Already have account?"}

          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Signup" : " Login"}
          </span>
        </p>

      </div>

    </div>
  );
}

export default AuthPage;


