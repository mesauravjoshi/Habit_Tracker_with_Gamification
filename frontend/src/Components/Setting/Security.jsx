// ./Components/Pages/Setting/Profile.js
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { url } from "../../URL/Url";

export default function Security() {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const updateProfile = async () => {
    try {
      const res = await axios.patch(`${url}/profile/chnagePassword`, formData, {
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
        <label className="block mb-1 text-sm">Current Pasoword</label>
        <input
          type="text"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-zinc-800 text-yellow-400 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          placeholder="Current Pasoword"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">New Passoword</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-zinc-800 text-yellow-400 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          placeholder="New Passoword"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Confirm Passoword</label>
        <input
          type="text"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-zinc-800 text-yellow-400 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          placeholder="Confirm Passoword"
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md"
      // onClick={() => handleUpateProfile()}
      >
        Change Passowrd
      </button>
    </form>
  );
}
