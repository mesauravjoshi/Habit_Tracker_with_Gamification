import React, { useState, useContext } from "react";
import axios from "axios";
import { url } from '@/URL/Url';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '@/Components/Context/AuthContext';
import { StreaXPContext } from "@/Components/Context/Strea&XPContext";
import { Link } from "react-router-dom";
// Single-file React component using TailwindCSS (mobile-first).
// Copy this file into your project (e.g. src/components/AuthCard.jsx).
// Make sure your project is configured for Tailwind and dark mode (class strategy is recommended).

export default function AuthCard() {
  const { fetchUserData } = useContext(AuthContext); // Access user from context
  const { fetchStreaXPData } = useContext(StreaXPContext);

  const [mode, setMode] = useState("signup"); // 'signup' or 'login'
  const [showPassword, setShowPassword] = useState({ pwd: false, confirm: false });
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const navigate = useNavigate()
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Production-ready note: replace with real submit logic (API call, validation, etc.)
    if (mode === "signup") {
      // minimal client-side validation example
      if (!form.name || !form.email || !form.password || !form.confirm) {
        return alert("Please fill all fields.");
      }
      if (form.password !== form.confirm) return alert("Passwords do not match.");

      try {
        let updatedForm = {
          ...form,
          username: form.email
        }
        delete updatedForm.confirm
        console.log(form);
        const response = await axios.post(`${url}/auth/signup`, updatedForm);
        console.log('Success:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }

    } else {
      if (!form.email || !form.password) return alert("Please enter email and password.");
      try {
        const updatedForm = {
          username: form.email,
          password: form.password,
        }
        console.log(updatedForm);

        const response = await axios.post(`${url}/auth/login`, updatedForm);
        // console.log('Success:', response.data.token);
        localStorage.setItem('habit token', response.data.token);
        fetchUserData();
        fetchStreaXPData();
        navigate('/track-streak');
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
      console.log(`Logging in ${form.email}`);

      // alert(`Logging in ${form.email}`);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100/10 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="w-full max-w-md">
        <div className="bg-gray-50 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-lg dark:shadow-none ring-1 ring-slate-900/5 dark:ring-0 overflow-hidden transition-colors duration-300">

          {/* Illustration/Header */}
          <div className="px-6 pt-8 pb-6 text-center">
            <Link to={'/home'}>
              <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 shadow-md">
                {/* simple dumbbell + heart icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                  <path d="M3 10.5A1.5 1.5 0 0 1 4.5 9H6v6H4.5A1.5 1.5 0 0 1 3 13.5v-3zM18 9h1.5A1.5 1.5 0 0 1 21 10.5v3A1.5 1.5 0 0 1 19.5 15H18V9zM8 9h8v6H8V9zM6 6.75A1.75 1.75 0 0 1 7.75 5h8.5A1.75 1.75 0 0 1 18 6.75V17.25A1.75 1.75 0 0 1 16.25 19h-8.5A1.75 1.75 0 0 1 6 17.25V6.75z" />
                </svg>
              </div>
            </Link>

            <h1 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">{mode === "signup" ? "Start Building Better Habits" : "Welcome Back to HabitQuest"}</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">A simple place to track progress and build consistency.</p>
          </div>

          {/* Tabs / Toggle */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full p-1.5">
              <button
                aria-pressed={mode === "signup"}
                onClick={() => setMode("signup")}
                className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none ${mode === "signup" ? "bg-gray-50 dark:bg-slate-900 shadow-sm" : "text-slate-600 dark:text-slate-300"
                  }`}
              >
                Sign Up
              </button>
              <button
                aria-pressed={mode === "login"}
                onClick={() => setMode("login")}
                className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none ${mode === "login" ? "bg-gray-50 dark:bg-slate-900 shadow-sm" : "text-slate-600 dark:text-slate-300"
                  }`}
              >
                Log In
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-500 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  // type="email"
                  className="mt-1 block w-full rounded-lg border border-gray-500 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <div className="mt-1 relative">
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword.pwd ? "text" : "password"}
                    className=" block w-full rounded-lg border border-gray-500 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
                    placeholder="Enter password"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    required
                  />

                  <button
                    type="button"
                    aria-label={showPassword.pwd ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => ({ ...s, pwd: !s.pwd }))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md focus:outline-none"
                  >
                    {/* eye icon */}
                    {showPassword.pwd ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-500 dark:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M3 3l18 18" />
                        <path d="M10.584 10.587A3 3 0 0 0 13.413 13.416" />
                        <path d="M9.173 5.173A10 10 0 0 1 21 12c-1.3 2.1-3.4 4-6 5.5" />
                        <path d="M3 12c2.6-3.5 6-5 9-5a10 10 0 0 1 9 5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-500 dark:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M12 5c4 0 7 3.5 9 7-2 3.5-5 7-9 7-4 0-7-3.5-9-7 2-3.5 5-7 9-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {mode === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
                  <div className="mt-1 relative">
                    <input
                      name="confirm"
                      value={form.confirm}
                      onChange={handleChange}
                      type={showPassword.confirm ? "text" : "password"}
                      className="block w-full rounded-lg border border-gray-500 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      aria-label={showPassword.confirm ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((s) => ({ ...s, confirm: !s.confirm }))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md focus:outline-none"
                    >
                      {showPassword.confirm ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-500 dark:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M3 3l18 18" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-500 dark:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M12 5c4 0 7 3.5 9 7-2 3.5-5 7-9 7-4 0-7-3.5-9-7 2-3.5 5-7 9-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-white font-semibold bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
                >
                  {mode === "signup" ? "Sign Up" : "Log In"}
                </button>
              </div>

              <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                {mode === "signup" ? (
                  <>
                    Already have an account?{' '}
                    <button type="button" onClick={() => setMode('login')} className="font-medium text-emerald-500 hover:underline">
                      Log In
                    </button>
                  </>
                ) : (
                  <>
                    New here?{' '}
                    <button type="button" onClick={() => setMode('signup')} className="font-medium text-emerald-500 hover:underline">
                      Create account
                    </button>
                  </>
                )}
              </div>

            </form>
          </div>

        </div>

        {/* Small hint/footer */}
        <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
          By continuing you agree to HabitQuest's Terms & Privacy.
        </div>
      </div>
    </div>
  );
}
