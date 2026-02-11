    import { Link } from "react-router-dom";
    import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
 import { signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();

const handleLogout = () => {
  signOut(auth).then(() => navigate("/login"));
};

  return (
    <nav>
      <Link to="/">Portfolio</Link> | 
      <Link to="/resume">Resume Generator</Link> | 
      <Link to="/login">Login</Link> | 
      <Link to="/signup">Signup</Link>

      <button onClick={handleLogout}>
  Logout
</button>

     
    </nav>
  );
}

export default Navbar;
