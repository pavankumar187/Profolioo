import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {

  const [user, setUser] = useState(undefined);
  const location = useLocation();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();

  }, []);

  if (user === undefined) return <p>Loading...</p>;

  if (!user)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}

export default ProtectedRoute;
