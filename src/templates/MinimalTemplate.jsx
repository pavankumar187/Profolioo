function MinimalTemplate({ data }) {
  return (
    <div style={{ padding: "20px", fontFamily: "serif" }}>

      <h2>{data.name}</h2>
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

      <h4>Skills</h4>
      <p>{data.skills}</p>

      <h4>Education</h4>
      <p>{data.education}</p>

      <h4>Experience</h4>
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

export default MinimalTemplate;