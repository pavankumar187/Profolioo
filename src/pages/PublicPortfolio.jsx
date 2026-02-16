import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
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

  if (!portfolio) return <h2>Loading...</h2>;

  return (
    <div className="public-container">

      <div className="public-card">
        {portfolio.profileImage && (
          <img src={portfolio.profileImage} alt="Profile" />
        )}

        <h1>{portfolio.name}</h1>
        <h3>{portfolio.title}</h3>

        <p className="bio">{portfolio.bio}</p>

        <div className="skills">
          {portfolio.skills &&
            portfolio.skills.split(",").map((skill, index) => (
              <span key={index}>{skill.trim()}</span>
            ))}
        </div>

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

      </div>
    </div>
  );
}

export default PublicPortfolio;
