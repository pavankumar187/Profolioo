import { useState, useEffect} from "react";
import "./PortfolioBuilder.css";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc } from "firebase/firestore";




function PortfolioBuilder() {
    useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    const docRef = doc(db, "portfolios", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFormData(docSnap.data());
    }

  });

  return () => unsubscribe();

}, []);

  const [user, setUser] = useState(null);
  useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();

}, []);
console.log("Logged User:", user);

  const handleSavePortfolio = async () => {

  if (!user) {
    alert("Please login first");
    return;
  }

  try {

    await setDoc(
      doc(db, "portfolios", user.uid),
      formData
    );

    alert("Portfolio Saved Successfully");

  } catch (error) {
    alert(error.message);
  }

};


  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="builder-container">

      {/* LEFT FORM */}
      <div className="builder-form">

        <h2>Build Your Portfolio</h2>

        <input
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
        />

        <input
          name="title"
          placeholder="Professional Title"
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          onChange={handleChange}
        />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          onChange={handleChange}
        />

        <input
          name="github"
          placeholder="GitHub Link"
          onChange={handleChange}
        />

        <input
          name="linkedin"
          placeholder="LinkedIn Link"
          onChange={handleChange}
        />
        <button onClick={handleSavePortfolio}>
  Save Portfolio
</button>

      </div>

      {/* RIGHT PREVIEW */}
      <div className="builder-preview">

        <h2>{formData.name || "Your Name"}</h2>
        <h4>{formData.title || "Your Title"}</h4>

        <p>{formData.bio || "Your bio appears here..."}</p>

        <p>
          <strong>Skills:</strong>{" "}
          {formData.skills || "Your skills"}
        </p>

        <div className="links">
          {formData.github && <a href={formData.github}>GitHub</a>}
          {formData.linkedin && <a href={formData.linkedin}>LinkedIn</a>}
        </div>

      </div>

    </div>
  );

}
export default PortfolioBuilder;
