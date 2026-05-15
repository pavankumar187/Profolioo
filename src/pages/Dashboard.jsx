import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {

const fetchResumes = async () => {

const querySnapshot = await getDocs(collection(db, "resumes"));

const data = querySnapshot.docs.map((doc) => ({
id: doc.id,
...doc.data()
}));

setResumes(data);

};

fetchResumes();

}, []);
  
  
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };
  return (
    <div>
    <div>
      <Link to="/profile"> Profile</Link>
      <h1>Welcome To Dashboard 🎉</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>

      <div className="resume-list">
{resumes.map((resume) => (

<div key={resume.id} className="resume-card">

<h3>{resume.name}</h3>
<p>{resume.email}</p>

<button>View</button>

<button>Download</button>

</div>

))}

</div>


</div>  
  );
}

export default Dashboard;
