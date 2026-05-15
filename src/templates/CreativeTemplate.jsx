function CreativeTemplate({ data, photo }) {
  return (
    <div style={{ padding: "20px", background: "#fdf2f8" }}>
      
      <h1 style={{ color: "#db2777" }}>{data.name}</h1>
      <p>{data.email} | {data.phone}</p>

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

      <h3>Education</h3>
      <p>{data.education}</p>

      <h3>Experience</h3>
      <p>{data.experience}</p>

      <h3>Certifications</h3>
<ul>
  {data.certifications?.split(",").map((c, i) => (
    <li key={i}>{c}</li>
  ))}
</ul>

    </div>
  );
}

export default CreativeTemplate;