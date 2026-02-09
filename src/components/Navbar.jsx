    import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Portfolio</Link> | 
      <Link to="/resume">Resume Generator</Link> | 
      <Link to="/login">Login</Link> | 
      <Link to="/signup">Signup</Link>
    </nav>
  );
}

export default Navbar;
