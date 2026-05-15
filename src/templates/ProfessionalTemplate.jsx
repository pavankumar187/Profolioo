function ProfessionalTemplate({ data, photo }) {
  return (
    <div style={{
      padding: "30px",
      fontFamily: "Georgia",
      background: "white"
    }}>

      <div style={{
        borderBottom: "2px solid black",
        marginBottom: "20px"
      }}>
        <h1>{data.name}</h1>
        <p>{data.email} | {data.phone}</p>
      </div>
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
  );
}

export default ProfessionalTemplate;