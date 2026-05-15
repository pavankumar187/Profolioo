import { useState, useRef } from "react";
import "./ResumeBuilder.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

// Templates
import ModernTemplate from "../templates/ModernTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import DeveloperTemplate from "../templates/DeveloperTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ElegantTemplate from "../templates/ElegantTemplate";

function ResumeBuilder() {

  const location = useLocation();
  const resumeRef = useRef();

  const [photo, setPhoto] = useState(null);

  const [template, setTemplate] = useState(
    location.state?.template || "modern"
  );
const [data, setData] = useState({
  name: "",
  email: "",
  phone: "",
  education: "",
  skills: "",
  experience: "",
  projects: "",
  certifications: "",
  github: "",
  linkedin: "",
  summary: ""
});
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Template Map (SCALABLE)
  const templateMap = {
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    developer: DeveloperTemplate,
    creative: CreativeTemplate,
    minimal: MinimalTemplate,
    elegant: ElegantTemplate
  };

  const SelectedTemplate = templateMap[template];

  // ✅ Save Resume
  const saveResume = async () => {
    try {
      await addDoc(collection(db, "resumes"), data);
      alert("Resume saved!");
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Download PDF
  const downloadPDF = () => {
    html2canvas(resumeRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");
    });
  };

  return (
    <div className="resume-container">

      {/* LEFT SIDE */}
      <div className="resume-form">

        <h2>Select Template</h2>

        <div className="template-buttons">
          <button onClick={() => setTemplate("modern")}>Modern</button>
          <button onClick={() => setTemplate("professional")}>Professional</button>
          <button onClick={() => setTemplate("developer")}>Developer</button>
          <button onClick={() => setTemplate("creative")}>Creative</button>
          <button onClick={() => setTemplate("minimal")}>Minimal</button>
          <button onClick={() => setTemplate("elegant")}>Elegant</button>
        </div>

        <h2>Build Resume</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <textarea 
  name="summary" 
  placeholder="Profile Summary (2-3 lines about you)" 
  onChange={handleChange} 
/>
        <input name="phone" placeholder="Phone" onChange={handleChange} />

        <textarea name="education" placeholder="Education" onChange={handleChange} />
        <textarea name="skills" placeholder="Skills" onChange={handleChange} />
        <textarea name="experience" placeholder="Experience" onChange={handleChange} />
        <textarea 
  name="projects" 
  placeholder="Projects (separate by comma)" 
  onChange={handleChange} 
/>
      <textarea 
  name="certifications" 
  placeholder="Certifications (comma separated)" 
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

        {/* ✅ Optional Photo Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setPhoto(URL.createObjectURL(file));
            }
          }}
        />

        <button onClick={downloadPDF} className="download-btn">
          Download PDF
        </button>

        <button onClick={saveResume} className="save-btn">
          Save Resume
        </button>

      </div>

      {/* RIGHT SIDE PREVIEW */}
      <div className="resume-preview" ref={resumeRef}>
        {SelectedTemplate && (
          <SelectedTemplate data={data} photo={photo} />
        )}
      </div>

    </div>
  );
}

export default ResumeBuilder;