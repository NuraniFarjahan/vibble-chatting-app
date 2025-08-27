import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userInfoSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const auth = getAuth();
  const navigate=useNavigate()
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch= useDispatch()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = () => {
    setLoading(true);
    
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    onAuthStateChanged(auth, (user) => {
  if (user.emailVerified) {
toast.success('Login successful!');
    dispatch(setUser(userCredential.user))
      console.log(userCredential.user);
      navigate("/")
      setLoading(false)
  } else {
      toast.error('Please Verify Your Email');
      console.log(userCredential.user);
      setLoading(false)
  }
});
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error("Something Went Wrong")
    setLoading(false)
  });
  };

  const handleGoogleLogin = () => {
    toast('Google login clicked!');
  };

  const handleFacebookLogin = () => {
    toast('Facebook login clicked!');
  };

  return (
    <div className="min-h-screen bg-[#E8EDF2] flex justify-center items-center py-8 px-4 font-sans">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      
      <div className="w-full max-w-[440px] bg-white rounded-2xl p-10 shadow-sm">
        {/* Header */}
        <div className="flex flex-col items-center mb-7">
          <h1 className="text-2xl font-bold leading-7 text-[#171721] mb-1">
            Welcome back
          </h1>
          <p className="text-sm font-normal leading-4 text-[#7E7E8F]">
            Please sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="mb-5">
          <div className="flex flex-col justify-center items-start">
            {/* Email */}
            <label className="mb-2 text-sm font-normal text-[#07070C]">
              E-mail
            </label>
            <div className="relative w-full mb-5">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="w-full py-3 px-4 pr-10 rounded-lg outline-none border border-[#E8EDF2] text-sm placeholder-[#C6CBD9] focus:border-[#7364DB] transition-colors"
              />
            </div>

            {/* Password */}
            <label className="mb-2 text-sm font-normal text-[#07070C]">
              Password
            </label>
            <div className="relative w-full mb-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-full py-3 px-4 pr-10 rounded-lg outline-none border border-[#E8EDF2] text-sm placeholder-[#C6CBD9] focus:border-[#7364DB] transition-colors"
              />
              <span 
                className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-[#C6CBD9] hover:text-[#7364DB] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between w-full mb-5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="w-4 h-4 text-[#7364DB] border-gray-300 rounded focus:ring-[#7364DB]"
                />
                <p className="text-[#8083A3] text-sm">
                  Remember me
                </p>
              </div>
              <a href="#" className="text-[#7364DB] text-sm hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            {loading ? (
              <div className="w-full relative mb-5 py-3 text-lg flex items-center justify-center text-white font-semibold rounded-lg border border-[#7364DB] bg-[#7364DB]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full mb-5 py-3 text-base text-white font-semibold rounded-lg border border-[#7364DB] bg-[#7364DB] hover:text-[#7364DB] hover:bg-transparent transition-all duration-200"
              >
                
                Sign in
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-5">
          <div className="flex-1 border-t border-[#E8EDF2]"></div>
          <span className="px-4 text-sm text-[#8083A3]">or continue with</span>
          <div className="flex-1 border-t border-[#E8EDF2]"></div>
        </div>

        {/* Social Login */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <button
            onClick={handleGoogleLogin}
            className="flex-1 text-sm py-4 px-4 rounded-lg border border-[#E8EDF2] flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <FaGoogle className="text-[#DB4437]" />
            Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="flex-1 text-sm py-4 px-4 rounded-lg border border-[#E8EDF2] flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <FaFacebook className="text-[#4267B2]" />
            Facebook
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="flex justify-center items-center mt-5">
          <p className="text-sm text-[#07070C]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#7364DB] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;