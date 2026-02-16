import { useState } from "react";
import "./AuthPage.css";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";
  

function AuthPage() {

  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Forgot Password
  const handleResetPassword = () => {
    if (!email) {
      alert("Enter email first");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => alert("Password reset email sent"))
      .catch((err) => alert(err.message));
  };

  // Login / Signup
  const handleAuth = () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (isLogin) {

      signInWithEmailAndPassword(auth, email, password)
        .then(() => navigate(from, { replace: true }))
        .catch((err) => alert(err.message));

    } else {

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {

          const user = userCredential.user;

          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date()
          });

          alert("Account created successfully");
          setIsLogin(true);

        })
        .catch((err) => alert(err.message));
    }
  };

  // Google Login
  const handleGoogleLogin = () => {

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => navigate("/dashboard"))
      .catch((err) => alert(err.message));
  };

  return (
    <div className="auth-container">

      <button className="google-btn" onClick={handleGoogleLogin}>
        Continue with Google
      </button>

      {/* LEFT */}
      <div className="auth-left">
        <h2 className="brand">Profolio</h2>
        <p>Build Career. Build Future.</p>
      </div>

      {/* RIGHT */}
      <div className="auth-right">

        <h1>{isLogin ? "Login" : "Create Account"}</h1>

        {!isLogin && (
          <div className="name-row">
            <input placeholder="First Name" />
            <input placeholder="Last Name" />
          </div>
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-box">

          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>

        </div>

        <p className="forgot" onClick={handleResetPassword}>
          Forgot Password?
        </p>

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
