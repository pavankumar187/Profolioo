import { useNavigate } from "react-router-dom";
import "./Templates.css";

function Templates() {

  const navigate = useNavigate();

  const selectTemplate = (template) => {
    navigate("/portfolio-builder", { state: { template } });
  };

  return (
    <div className="template-page">

      <h2>Select Portfolio Template</h2>

      <div className="template-container">

        <div className="template-card">
          <h3>Modern Portfolio</h3>
          <p>Clean and minimal design</p>
          <button onClick={() => selectTemplate("modern")}>
            Use Template
          </button>
        </div>

        <div className="template-card">
          <h3>Creative Portfolio</h3>
          <p>Colorful creative layout</p>
          <button onClick={() => selectTemplate("creative")}>
            Use Template
          </button>
        </div>

        <div className="template-card">
          <h3>Professional Portfolio</h3>
          <p>Corporate professional design</p>
          <button onClick={() => selectTemplate("professional")}>
            Use Template
          </button>
        </div>

      </div>

    </div>
  );
}

export default Templates;
