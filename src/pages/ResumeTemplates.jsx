import { useNavigate } from "react-router-dom";
import "./ResumeTemplates.css";
import { useState } from "react";

// Import images
import template1 from "../assets/templates/template1.jpg";
import template2 from "../assets/templates/template2.jpg";
import template3 from "../assets/templates/template3.jpg";
import template4 from "../assets/templates/template4.jpg";
import template5 from "../assets/templates/template5.jpg";
import template6 from "../assets/templates/template6.jpg";

function ResumeTemplates() {

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const templates = [
    { id: "modern", name: "Modern", image: template1 },
    { id: "professional", name: "Professional", image: template2 },
    { id: "developer", name: "Developer", image: template3 },
    { id: "creative", name: "Creative", image: template4 },
    { id: "minimal", name: "Minimal", image: template5 },
    { id: "elegant", name: "Elegant", image: template6 }
  ];

  const handleSelect = (template) => {
    navigate("/resume-builder", { state: { template } });
  };

  return (
    <div className="templates-page">

      <h1>Select Resume Template</h1>

      <div className="templates-grid">

        {templates.map((t) => (
          <div
            key={t.id}
            className="template-card"
            onClick={() => setSelectedTemplate(t)}
          >
            <img src={t.image} alt={t.name} />

            <div className="overlay">
              <button onClick={() => handleSelect(t.id)}>
                Use Template
              </button>
            </div>

            <h3>{t.name}</h3>
          </div>
        ))}

      </div>

      {/* ✅ MODAL INSIDE RETURN */}
      {selectedTemplate && (
        <div className="modal">

          <div className="modal-content">

            <span
              className="close-btn"
              onClick={() => setSelectedTemplate(null)}
            >
              ×
            </span>

            <img
              src={selectedTemplate.image}
              alt={selectedTemplate.name}
            />

            <h2>{selectedTemplate.name}</h2>
            <button 
  onClick={(e) => {
    e.stopPropagation();
    handleSelect(selectedTemplate.id);
  }}
></button>

          </div>

        </div>
      )}

    </div>
  );
}

export default ResumeTemplates;