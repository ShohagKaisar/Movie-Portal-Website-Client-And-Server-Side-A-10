import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import auth from "../Firebase/Firebase.init";


export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forgetEmail, setForgateEmail] = useState("");

  const provider = new GoogleAuthProvider;

  const handleRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
    
  }

  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const handleLogout = () => {
    signOut(auth)
  }

  const handleGoogleLogin = () => {
    return signInWithPopup(auth, provider);
  }

  
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);

      return () => {
        unSubscribe();
      }
    })
  }, [])


  const authInfo = {
    handleGoogleLogin,
    handleLogin,
    handleLogout,
    handleRegister,
    user,
    loading,
    forgetEmail,
    setForgateEmail,
  }

  return (
    <div>
      <AuthContext.Provider value={authInfo}>
        {
          children
        }
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;