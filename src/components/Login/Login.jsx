
import { useContext, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Login = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const { handleLogin, handleGoogleLogin, setForgateEmail } = useContext(AuthContext);
  const [loginError, SetLoginError] = useState(null);

  const handleForgate = () => {
    const email = emailRef.current.value;
    setForgateEmail(email);
    navigate("/forgate");
  }

  const handleLoginSubmit = (e) => {
    SetLoginError(null);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    handleLogin(email, password).then(()=>{
      navigate("/");
    })
    .catch((error)=>{
      const err = error.message.slice(22,40);
      SetLoginError(err);
    })
  }

  const handleGoogleLoginSubmit = () => {
    handleGoogleLogin().then(() => {
      navigate("/")
    })
  }

  return (
    <div className="-mt-8 card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <p className="text-4xl font-bold text-blue-600 text-center mt-4">Login Now</p>
      <form onSubmit={handleLoginSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label onClick={handleForgate} className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        {
          loginError && <p className='text-red-600'>{loginError}</p>
        }
        <div className="form-control">
          <button className="btn btn-primary">Login</button>
        </div>
      <p className='text-center'>OR</p>
      </form>
      <button onClick={handleGoogleLoginSubmit} className="btn bg-green-500 -mt-6 text-lg">Continue With Google</button>
      <div className='my-4'>
        <p className="text-center mb-2">If you don't have an account. Please <NavLink to={"/register"}><span className="text-blue-600">Register</span></NavLink></p>
</div>
    </div>
  );
};

export default Login;