import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, email, password, role } = formData;

  if (!email || !password || (!isLogin && !name)) {
    toast.warn("Please fill all fields.");
    return;
  }

  setLoading(true);

  try {
    let res, data;

    if (isLogin) {
      // LOGIN
      res = await axios.post(`${API}/auth/login`, { email, password });
      data = res.data;

      if (data.success !== "yes") throw new Error(data.message || "Login failed");

      toast.success("Login successful!");
      localStorage.setItem("role", data.data.role);
      localStorage.setItem("user_name", data.data.name);
      localStorage.setItem("uid", data.data._id);

      navigate(data.data.role === "doctor" ? "/doctorLogin" : "/profile");
    } else {
      // SIGNUP
      res = await axios.post(`${API}/auth/register`, { name, email, password, role });
      data = res.data;

      if (data.success !== "yes") throw new Error(data.message || "Signup failed");

      toast.success("Signup successful!");
      localStorage.setItem("role", data.data.role);
      localStorage.setItem("user_name", data.data.name);
      localStorage.setItem("uid", data.data._id);

      navigate(data.data.role === "doctor" ? "/doctorLogin" : "/profile");
    }
  } catch (error) {
    console.error("FRONTEND ERROR:", error.response || error);
    toast.error(error.response?.data?.message || error.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};


  function HeartBackgroundSVG({ className }) {
    return (
      <svg
        className={className}
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="title desc"
      >
        <title id="title">Healthy Lifestyle Illustration</title>
        <desc id="desc">
          A big heart with an ECG line and three people: one meditating, one
          cheering, and one holding a clock, plus decorative veggies.
        </desc>
        <defs>
          <linearGradient id="heartGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ff6b8a" />
            <stop offset="1" stopColor="#f1305a" />
          </linearGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.18" />
          </filter>
        </defs>

        <g filter="url(#soft)" opacity="0.19">
          <path
            d="
              M600,240
              C560,160 452,120 376,160
              C260,220 256,392 360,498
              L600,736
              L840,498
              C944,392 940,220 824,160
              C748,120 640,160 600,240
            "
            fill="url(#heartGrad)"
          />
        </g>

        <path
          d="M350,420 L460,420 L495,340 L540,520 L590,360 L640,520 L690,420 L850,420"
          opacity="0.19"
          fill="none"
          stroke="#ffffff"
          strokeWidth="16"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-gray-100 relative">
      {/* Left Intro Section */}
      <div className="relative w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12 overflow-hidden 
                bg-gradient-to-b from-[#191024] via-[#1e293b] to-[#0f172a]">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 relative z-10">
          <span className="text-[#f43f5e]">Dr.</span>
          <span className="text-[#e0e0e0] ml-2">Care</span>
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-6 relative z-10">
          All-In-One Healthcare Platform
        </h2>
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed relative z-10">
          Book appointments, consult AI, manage reports, search hospitals, and more <br /> All in one place.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 relative flex flex-col justify-center p-8 md:p-16 ">
        <HeartBackgroundSVG className="absolute inset-0 w-full h-full object-contain opacity-100 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="flex gap-4 mt-3">
                  {["doctor", "user"].map((roleOption) => (
                    <span
                      key={roleOption}
                      onClick={() =>
                        setFormData({ ...formData, role: roleOption })
                      }
                      className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition
                        ${
                          formData.role === roleOption
                            ? "bg-[#f43f5e] text-white"
                            : "text-gray-300 border border-gray-500 hover:text-[#f43f5e]"
                        }`}
                    >
                      {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white
             focus:outline-none focus:ring-2 focus:ring-[#f43f5e]
             hover:border-[#f43f5e] hover:ring-1 hover:ring-[#f43f5e]  transition duration-100 ease-in-out"
                />
               
              </>
            )}
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white
             focus:outline-none focus:ring-2 focus:ring-[#f43f5e]
             hover:border-[#f43f5e] hover:ring-1 hover:ring-[#f43f5e]  transition duration-100 ease-in-out"
            />
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white
             focus:outline-none focus:ring-2 focus:ring-[#f43f5e]
             hover:border-[#f43f5e] hover:ring-1 hover:ring-[#f43f5e]  transition duration-100 ease-in-out"
            />
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer w-full bg-[#f43f5e] text-white font-bold py-2 rounded-lg hover:bg-[#be123c] transition transform hover:scale-105 active:scale-95 shadow-md flex justify-center items-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-300">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer text-[#f43f5e] font-semibold hover:underline  transition duration-100 ease-in-out"
            >
              {isLogin ? "Signup" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
