import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../Firebase/Firebase.init";


const Forgate = () => {
  const { forgetEmail } = useContext(AuthContext);
  const [notice, SetNotice] = useState(false);

  const handleReset = () => {
    const email = forgetEmail;
      sendPasswordResetEmail(auth, email).then(() => {
        SetNotice(true);
      })
    setTimeout(() => {
      window.open(`https://mail.google.com`, "_blank");
}, 2000)

  }
  return (
    <div className="flex justify-center items-center flex-col">
      <label className="input input-bordered flex items-center gap-2">
        Email:
        <input type="email" className="grow" value={forgetEmail} />
      </label>
      {
        notice && <p className="text-yellow-600">Please check your Email for reset your password</p>
      }
      <button onClick={handleReset} className="btn btn-primary my-4">Reset Your Password</button>
    </div>
  );
};

export default Forgate;