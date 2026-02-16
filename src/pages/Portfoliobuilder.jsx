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
    profileImage: ""
  });

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
        setFormData(docSnap.data());
      }
    };

    fetchPortfolio();
  }, [user]);

  // 📸 Upload Image
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

    setFormData((prev) => ({
      ...prev,
      profileImage: downloadURL
    }));

    alert("Image Uploaded Successfully");
  };

  // 💾 Save Portfolio
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

      {/* LEFT SIDE FORM */}
      <div className="builder-form">
        <h2>Build Your Portfolio</h2>

        <input name="name" placeholder="Your Name" onChange={handleChange} value={formData.name} />
        <input name="title" placeholder="Professional Title" onChange={handleChange} value={formData.title} />
        <textarea name="bio" placeholder="Short Bio" onChange={handleChange} value={formData.bio} />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} value={formData.skills} />
        <input name="github" placeholder="GitHub Link" onChange={handleChange} value={formData.github} />
        <input name="linkedin" placeholder="LinkedIn Link" onChange={handleChange} value={formData.linkedin} />

        <input type="file" onChange={handleImageUpload} />

        <button onClick={handleSavePortfolio}>
          Save Portfolio
        </button>
      </div>

      {/* RIGHT SIDE PREVIEW */}
      <div className="builder-preview">

        {formData.profileImage && (
          <img
            src={formData.profileImage}
            alt="Profile"
            className="preview-image"
          />
        )}

        <h2>{formData.name || "Your Name"}</h2>
        <h4>{formData.title || "Your Title"}</h4>
        <p>{formData.bio || "Your bio appears here..."}</p>

        <p><strong>Skills:</strong> {formData.skills || "Your skills"}</p>

        <div className="links">
          {formData.github && <a href={formData.github} target="_blank" rel="noreferrer">GitHub</a>}
          {formData.linkedin && <a href={formData.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
        </div>

        {user && (
          <div className="public-buttons">
            <button onClick={() => window.open(`/portfolio/${user.uid}`, "_blank")}>
              View Public Portfolio
            </button>

            <button
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
