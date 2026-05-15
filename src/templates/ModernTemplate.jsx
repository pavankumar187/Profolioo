function ModernTemplate({ data, photo }) {
  return (
    <div style={{
      display: "flex",
      fontFamily: "Arial",
      width: "100%",
      minHeight: "100vh"
    }}>

      {/* LEFT SIDEBAR */}
      <div style={{
        width: "30%",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}>

        {photo && (
          <img
            src={photo}
            alt="profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "15px"
            }}
          />
        )}

        <h2>{data.name || "Your Name"}</h2>
        <p>{data.email}</p>
        <p>{data.phone}</p>

        <hr />
      <h3>Profile Summary</h3>
<p>{data.summary}</p>
        <p>
  {data.github && (
    <a href={data.github} target="_blank" rel="noreferrer">
      GitHub
    </a>
  )}
  {" | "}
  {data.linkedin && (
    <a href={data.linkedin} target="_blank" rel="noreferrer">
      LinkedIn
    </a>
  )}
</p>

        <h3>Skills</h3>
        <p>{data.skills}</p>
        <h3>Projects</h3>
<ul>
  {data.projects?.split(",").map((p, i) => (
    <li key={i}>{p}</li>
  ))}
</ul>
    <h3>Certifications</h3>
<ul>
  {data.certifications?.split(",").map((c, i) => (
    <li key={i}>{c}</li>
  ))}
</ul>

      </div>

      {/* RIGHT CONTENT */}
      <div style={{
        width: "70%",
        padding: "20px",
        background: "#f8fafc"
      }}>

        <h2>Education</h2>
        <p>{data.education}</p>

        <h2>Experience</h2>
        <p>{data.experience}</p>

      </div>

    </div>
  );
}

export default ModernTemplate;