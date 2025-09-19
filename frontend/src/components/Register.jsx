import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

const Register = (props) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [signInForm, setSignInForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use environment variable for backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify(data.data)); // or data.data, depending on your response
        localStorage.setItem('isAuthenticated', 'true');
        dispatch(login(data.data));
        navigate("/Mainpage");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInForm),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify(data.data.user)); // or data.data, depending on your response
        localStorage.setItem('isAuthenticated', 'true');
        dispatch(login(data.data.user)); // Store user info in Redux
        navigate("/Mainpage");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-blue-400/40 text-white p-8 rounded-3xl shadow-2xl w-96 relative">
      <button
        onClick={props.onClose}
        className="absolute top-4 right-4 text-yellow-400 hover:text-white text-2xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400 drop-shadow-md">
        {isSignIn ? "Sign In" : "Create Account"}
      </h2>

      {!isSignIn && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      )}

      {isSignIn && (
        <form onSubmit={handleSignInSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username or Email"
            value={signInForm.username}
            onChange={handleSignInChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signInForm.password}
            onChange={handleSignInChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      )}

      <div className="mt-4 text-center">
        {isSignIn ? (
          <>
            <span className="text-gray-300">Don't have an account?</span>
            <button
              type="button"
              className="ml-2 text-yellow-400 hover:underline font-semibold"
              onClick={() => setIsSignIn(false)}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-300">Already registered?</span>
            <button
              type="button"
              className="ml-2 text-blue-400 hover:underline font-semibold"
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
