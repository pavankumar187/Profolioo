import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

const handleUpdate = async () => {

  await updateDoc(doc(db, "users", user.uid), {
    name,
    bio,
    skills
  });

  alert("Profile Updated");
};

function Profile() {

  const [profile, setProfile] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {

    if (docSnap.exists()) {
  const data = docSnap.data();
  setProfile(data);
  setName(data.name || "");
  setBio(data.bio || "");
  setSkills(data.skills || "");
}


    if (!user) return;

    const fetchProfile = async () => {

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };

    fetchProfile();

  }, [user]);

  const [name, setName] = useState("");
const [bio, setBio] = useState("");
const [skills, setSkills] = useState("");


  return (
    <div>

      <h2>Profile Page</h2>

      {profile ? (
        <>
          <p>Email: {profile.email}</p>
          <p>
            Joined:
            {profile.createdAt?.toDate().toDateString()}
          </p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
<input
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<textarea
  placeholder="Bio"
  value={bio}
  onChange={(e) => setBio(e.target.value)}
/>

<input
  placeholder="Skills"
  value={skills}
  onChange={(e) => setSkills(e.target.value)}
/>

<button onClick={handleUpdate}>
  Save Profile
</button>

    </div>
  );
}

export default Profile;
