import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./PublicPortfolio.css";

function PublicPortfolio() {
  const { uid } = useParams();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const docRef = doc(db, "portfolios", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPortfolio(docSnap.data());
      }
    };

    fetchPortfolio();
  }, [uid]);

  if (!portfolio) return <h2 className="loading">Loading...</h2>;

  return (
  <div className="public-container">

    <div className="public-card">

      {portfolio.profileImage && (
        <img
          src={portfolio.profileImage}
          alt="Profile"
          className="public-avatar"
        />
      )}

      <h1>{portfolio.name}</h1>
      <h3>{portfolio.title}</h3>

      <p className="public-bio">{portfolio.bio}</p>

      {/* SKILLS */}
      <div className="skills">
        {portfolio.skills?.split(",").map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill.trim()}
          </span>
        ))}
      </div>

      {/* LINKS */}
      <div className="public-links">
        {portfolio.github && (
          <a href={portfolio.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
        {portfolio.linkedin && (
          <a href={portfolio.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        )}
      </div>

      {/* PROJECTS */}
      {portfolio.projects?.length > 0 && (
        <>
          <h2 style={{ marginTop: "30px" }}>Projects</h2>

          <div className="project-grid">
            {portfolio.projects.map((proj, index) => (
              <div key={index} className="project-card">
                <h4>{proj.title}</h4>
                <p>{proj.description}</p>

                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  </div>
);
}
export default PublicPortfolio;
