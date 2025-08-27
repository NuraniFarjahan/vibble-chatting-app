import React,{ useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { HashLoader, PropagateLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router';
import { getDatabase, ref, set } from "firebase/database";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Error fields
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [agreeTermsErr, setAgreeTermsErr] = useState("");
  const [showPass, setShowPass]= useState(false)
  const [showConPass, setShowConPass]= useState(false)
  const [loading, setLoading]= useState(false)
  const auth = getAuth();
  const db= getDatabase()
  const navigate=useNavigate()
// First Name
const handleFirstNameChange = (e) => {
  setFirstName(e.target.value);
  setFirstNameErr("");
};

// Last Name
const handleLastNameChange = (e) => {
  setLastName(e.target.value);
  setLastNameErr("");
};

// Email
const handleEmailChange = (e) => {
  setEmail(e.target.value);
  setEmailErr("");
};

// Phone
const handlePhoneChange = (e) => {
  setPhone(e.target.value);
  setPhoneErr("");
};

// Password
const handlePasswordChange = (e) => {
  setPassword(e.target.value);
  setPasswordErr("")
};

// Confirm Password
const handleConfirmPasswordChange = (e) => {
  setConfirmPassword(e.target.value);
  setConfirmPasswordErr("")
};

// Agree Terms (Checkbox)
const handleAgreeTermsChange = (e) => {
  setAgreeTerms(e.target.checked);
  setAgreeTermsErr("")
};


const handleSubmit = () => {
  if (firstName.trim() === "") {
    setFirstNameErr("Please enter your first name");
  }
  if (lastName.trim() === "") {
    setLastNameErr("Please enter your last name");
  }
  if (email.trim() === "") {
    setEmailErr("Please enter your email");
  }
  
  if (phone.trim() === "") {
    setPhoneErr("Please enter your phone number");
  }
  
  if (password.trim() === "") {
    setPasswordErr("Please enter your password");
  }
  
  if (confirmPassword.trim() === "") {
    setConfirmPasswordErr("Please confirm your password");
  }
  
  if (confirmPassword !== password) {
    setConfirmPasswordErr("Passwords do not match");
  }
  if (!agreeTerms) {
    setAgreeTermsErr("You must agree to the terms and conditions");
  }
  if (password!==confirmPassword) {
    setConfirmPasswordErr("Password and Confirm password should be same");
  }
if (firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && password.trim() !== "" && confirmPassword.trim() !== "" && password==confirmPassword && agreeTerms) {
setLoading(true)

createUserWithEmailAndPassword(auth, email, password)
  .then(() => {
    updateProfile(auth.currentUser, {
  displayName:`${firstName} ${lastName}`,
})
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.success("Sign up successful! Please verify your email");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        set(ref(db, 'users/' + auth.currentUser.uid), {
    username: `${firstName} ${lastName}`,
    email: email,
  });
        setEmail("");
        setFirstName("");
        setLoading(false)
        setLastName("");
        setPassword("");
      })
      .catch((error) => {
        toast.error("Signup successful but verification email failed: " + error.message);
      });
  })
  .catch((error) => {
    toast.error("Signup failed: " + error.message);
  })
  }
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
          Create an account
        </h1>
        <p className="text-sm font-normal leading-4 text-[#7E7E8F]">
          You are welcome!
        </p>
      </div>

      {/* Form */}
      <div className="mb-5">
        <div className="flex flex-col justify-center items-start">
          {/* Name Label */}
          <label className="mb-2 text-sm leading-4 font-normal text-[#07070C]">
            Your Name
          </label>

          {/* Name Inputs */}
          <div className="flex w-full justify-between mb-5 gap-4">
            <div className="relative w-full">
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="First name"
                className="w-full py-3 px-4 pr-10 rounded-lg outline-none border border-[#E8EDF2] text-sm placeholder-[#C6CBD9] focus:border-[#7364DB]"
              />
              <p className="text-red-500 text-sm">{firstNameErr}</p>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="Last name"
                className="w-full py-3 px-4 pr-10 rounded-lg outline-none border border-[#E8EDF2] text-sm placeholder-[#C6CBD9] focus:border-[#7364DB]"
              />
              <p className="text-red-500 text-sm">{lastNameErr}</p>
            </div>
          </div>

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
              placeholder="Email"
              className="w-full py-3 px-4 pr-10 rounded-lg outline-none border border-[#E8EDF2] text-sm placeholder-[#C6CBD9] focus:border-[#7364DB]"
            />
            <p className="text-red-500 text-sm">{emailErr}</p>
          </div>

          {/* Phone */}
          <label className="mb-2 text-sm font-normal text-[#07070C]">
            Phone numbers
          </label>
          <div className="relative w-full mb-5">
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(+01)"
              className="w-full py-3 px-4 pr-10 rounded-lg outline-none border border-[#E8EDF2] text-sm placeholder-[#C6CBD9] focus:border-[#7364DB]"
            />
            <p className="text-red-500 text-sm">{phoneErr}</p>
          </div>

          {/* Password */}
          <label className="mb-2 text-sm font-normal text-[#07070C]">
            Password
          </label>
          <div className="relative w-full mb-5">
            <input
              type={showPass ? "text":"password"}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-full py-3 px-4 pr-10 rounded-lg outline-none border border-[#E8EDF2] text-sm placeholder-[#C6CBD9] focus:border-[#7364DB]"
            />
            <span className='absolute top-1/2 -translate-y-1/2 right-2' onClick={()=>setShowPass(!showPass)}>{showPass ? <FaEye />
: <FaEyeSlash />

}</span>
            <p className="text-red-500 text-sm">{passwordErr}</p>
          </div>

          {/* Confirm Password */}
          <label className="mb-2 text-sm font-normal text-[#07070C]">
            Confirm Password
          </label>
          <div className="relative w-full mb-5">
            <input
             type={showConPass ? "text":"password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
              className="w-full py-3 px-4 pr-10 rounded-lg outline-none border border-[#E8EDF2] text-sm placeholder-[#C6CBD9] focus:border-[#7364DB]"
            />
            <p className="text-red-500 text-sm">{confirmPasswordErr}</p>
            <span className='absolute top-1/2 -translate-y-1/2 right-2' onClick={()=>setShowConPass(!showConPass)}>{showConPass ? <FaEye />
: <FaEyeSlash />

}</span>
          </div>

          {/* Sign Up Button */}
          {
            loading ? (<div
            className="w-full relative mb-5 py-3 pb-6 text-lg flex items-center justify-center text-white font-semibold rounded-lg border border-[#7364DB] bg-[#7364DB]"
          >
            <PropagateLoader color='white'/>
          </div>):(<button
            type="button"
            onClick={handleSubmit}
            className="w-full mb-5 py-3 text-base text-white font-semibold rounded-lg border border-[#7364DB] bg-[#7364DB] hover:text-[#7364DB] hover:bg-transparent transition-all duration-200"
          >
            Sign up
          </button>)
          }
          

          {/* Terms Checkbox */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={agreeTerms}
                onChange={handleAgreeTermsChange}
                className="w-4 h-4 text-[#7364DB] border-gray-300 rounded focus:ring-[#7364DB]"
              />
              <p className="text-[#8083A3] text-sm">
                I agree with terms & conditions
              </p>
            </div>
            <p className="text-red-500 text-sm">{agreeTermsErr}</p>
          </div>
        </div>
      </div>

      {/* Social Login */}
      <div className="flex items-center justify-center gap-5 mb-5">
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-xs py-4 px-2 rounded-lg border border-[#E8EDF2] flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          Google account
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-xs py-4 px-2 rounded-lg border border-[#E8EDF2] flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          Facebook account
        </a>
      </div>

      {/* Sign In Link */}
      <div className="flex justify-center items-center mt-5">
        <p className="text-sm text-[#07070C]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#7364DB] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>
);

}