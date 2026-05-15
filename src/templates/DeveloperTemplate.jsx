function DeveloperTemplate({ data, photo }) {
  return (
    <div style={{
      background: "#0f172a",
      color: "#38bdf8",
      padding: "25px",
      fontFamily: "monospace"
    }}>

      <h1>{data.name}</h1>
      <p>{data.email}</p>
      <h3>Profile Summary</h3>
<p>{data.summary}</p>
      <p>{data.phone}</p>

      <hr />
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

      <h3>Projects / Experience</h3>
      <p>{data.experience}</p>

      <h3>Education</h3>
      <p>{data.education}</p>

      <h3>Certifications</h3>
<ul>
  {data.certifications?.split(",").map((c, i) => (
    <li key={i}>{c}</li>
  ))}
</ul>

    </div>
  );
}

export default DeveloperTemplate;