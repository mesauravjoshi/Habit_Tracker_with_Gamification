// ./Components/Pages/Setting/Profile.js
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { url } from "../../URL/Url";

export default function Profile() {
  const { user, token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const token = localStorage.getItem('token'); // or use context if stored there
        const res = await axios.get(`${url}/profile/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data) setFormData(res.data)
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const updateProfile = async () => {
    try {
      const res = await axios.patch(`${url}/profile/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data) setFormData(res.data)
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile()
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md text-white"
    >
      <div>
        <label className="block mb-1 text-sm">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-zinc-800 text-yellow-400 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Email</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-zinc-800 text-yellow-400 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          placeholder="Enter your email"
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md"
      // onClick={() => handleUpateProfile()}
      >
        Update
      </button>
    </form>
  );
}
