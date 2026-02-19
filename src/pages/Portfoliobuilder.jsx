import { useState, useEffect } from "react";
import "./PortfolioBuilder.css";
import { auth, db, storage } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function PortfolioBuilder() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    profileImage: "",
    projects: []
  });

  // 🔹 Add Project
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", description: "", link: "" }
      ]
    });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;

    setFormData({
      ...formData,
      projects: updatedProjects
    });
  };

  // 🔐 Track logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 📥 Load saved portfolio
    useEffect(() => {
  if (!user) return;

  const fetchPortfolio = async () => {
    const docRef = doc(db, "portfolios", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      setFormData({
        ...data,
        projects: data.projects || []   // 🔥 Prevents map error
      });
    }
  };

  fetchPortfolio();
}, [user]);

  // 📸 Upload profile image
  const handleImageUpload = async (e) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    const imageRef = ref(storage, `profiles/${user.uid}`);
    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);

    setFormData({
      ...formData,
      profileImage: downloadURL
    });

    alert("Image Uploaded Successfully");
  };

  // 💾 Save portfolio
  const handleSavePortfolio = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await setDoc(
        doc(db, "portfolios", user.uid),
        {
          ...formData,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      alert("Portfolio Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Error saving portfolio");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <h2>Loading...</h2>;

  return (
  <div className="builder-container">

    {/* LEFT FORM */}
    <div className="builder-form">

      <h2>Build Your Portfolio</h2>

      <input name="name" placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input name="title" placeholder="Professional Title"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea name="bio" placeholder="Short Bio"
        value={formData.bio}
        onChange={handleChange}
      />

      <input name="skills" placeholder="Skills"
        value={formData.skills}
        onChange={handleChange}
      />

      <input name="github" placeholder="GitHub Link"
        value={formData.github}
        onChange={handleChange}
      />

      <input name="linkedin" placeholder="LinkedIn Link"
        value={formData.linkedin}
        onChange={handleChange}
      />

      <h3>Projects</h3>

      {formData.projects?.map((project, index) => (
        <div key={index}>
          <input
            placeholder="Project Title"
            value={project.title}
            onChange={(e) =>
              handleProjectChange(index, "title", e.target.value)
            }
          />
          <input
            placeholder="Project Description"
            value={project.description}
            onChange={(e) =>
              handleProjectChange(index, "description", e.target.value)
            }
          />
          <input
            placeholder="Project Link"
            value={project.link}
            onChange={(e) =>
              handleProjectChange(index, "link", e.target.value)
            }
          />
        </div>
      ))}

      <button onClick={addProject}>+ Add Project</button>

      <input type="file" onChange={handleImageUpload} />

      <button onClick={handleSavePortfolio}>
        Save Portfolio
      </button>

    </div>

    {/* RIGHT PREVIEW */}
    <div className="builder-preview">

      {formData.profileImage && (
        <img
          src={formData.profileImage}
          alt="Profile"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
      )}

      <h2>{formData.name}</h2>
      <h4>{formData.title}</h4>
      <p>{formData.bio}</p>

      <p><strong>Skills:</strong> {formData.skills}</p>

      <div className="links">
        {formData.github && (
          <a href={formData.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
        {formData.linkedin && (
          <a href={formData.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        )}
      </div>

      {formData.projects?.length > 0 && (
        <>
          <h3>Projects</h3>
          {formData.projects.map((proj, index) => (
            <div key={index}>
              <h4>{proj.title}</h4>
              <p>{proj.description}</p>
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer">
                  View Project
                </a>
              )}
            </div>
          ))}
        </>
      )}

      {/* 🔥 BUTTONS */}
      {user && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() =>
              window.open(`/portfolio/${user.uid}`, "_blank")
            }
          >
            View Public Portfolio
          </button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/portfolio/${user.uid}`
              );
              alert("Link Copied!");
            }}
          >
            Copy Public Link
          </button>
        </div>
      )}

    </div>

  </div>
);
}
export default PortfolioBuilder;
