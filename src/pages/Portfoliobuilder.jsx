import { useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function PortfolioBuilder() {

  const location = useLocation();
  const selectedTemplate = location.state?.template || "modern";

  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");

  // SAVE PORTFOLIO
  const handleSavePortfolio = async () => {

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    try {

      await setDoc(doc(db, "portfolios", user.uid), {
        name,
        skills,
        projects,
        template: selectedTemplate,
        createdAt: new Date()
      });

      alert("Portfolio Saved Successfully");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h2>Portfolio Builder</h2>
      <h3>Selected Template: {selectedTemplate}</h3>

      {/* FORM */}
      <div style={{ marginTop: "20px" }}>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Projects"
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
        />

        <br /><br />

        <button onClick={handleSavePortfolio}>
          Save Portfolio
        </button>

      </div>

      {/* LIVE PREVIEW */}
      <hr style={{ margin: "30px 0" }} />

      <h2>Portfolio Preview</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px"
        }}
      >

        <h1>{name || "Your Name"}</h1>

        <p>
          <strong>Skills:</strong> {skills || "Your skills here"}
        </p>

        <p>
          <strong>Projects:</strong> {projects || "Your projects here"}
        </p>

      </div>

    </div>
  );
}

export default PortfolioBuilder;
