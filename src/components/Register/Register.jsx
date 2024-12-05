import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";


const Register = () => {

  const { handleRegister, handleLogout, handleGoogleLogin, user, manageProfile } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [exist, setExist] = useState(false);

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleRegisterSubmit = (e) => {
    setError(null);
    setError(null);
    setExist(false);
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    
    if (!regex.test(password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.');
      return
    }
    handleRegister(email, password).then(res => {
      manageProfile(name, photo);
      setSuccess(true);
      setTimeout(()=>{
        navigate("/");
      },2000);
      // handleLogout();
    }).catch((error)=>{
     const err = error.message.slice(22,42);
      setExist(err);
    })
  }

  const handleGoogleLoginSubmit = () => {
    handleGoogleLogin()
    setTimeout(()=>{
      navigate("/")
    },2000);
  }

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <p className="text-4xl font-bold text-blue-600 text-center mt-4">Register Now</p>
      <form onSubmit={handleRegisterSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input type="text" name="photo" placeholder="Photo Url" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
        </div>
        {
          error && <p className="text-red-600">{error}</p>
        }
        {
          exist && <p className="text-red-600">{exist}</p>
        }
        {
          success && <p className="text-green-600">User Registration Successfull.</p>
        }
        <div className="form-control mt-2">
          <button className="btn btn-primary">Register</button>
        </div>
        <p className='text-center'>OR</p>
      </form>
      <button onClick={handleGoogleLoginSubmit} className="btn bg-green-500 -mt-6 text-lg my-4">Continue With Google</button>
      <p className="text-center mb-4">If you have an account Please <NavLink to={"/login"}><span className="text-blue-600">Login</span></NavLink></p>
    </div>
  );
};

export default Register;