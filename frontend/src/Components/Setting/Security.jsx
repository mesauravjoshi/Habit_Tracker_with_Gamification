// ./Components/Pages/Setting/Profile.js
import { useState, useContext } from "react";
import toast from 'react-hot-toast';
import axiosInstance from "@/api/axiosInstance";

export default function Security() {
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

  const notify = (type, message) => {
    if (type === 'success') {
      toast.success(message);
    }
    if (type === 'error') {
      toast.error(message);
    }
  }

  const updateProfile = async () => {
    try {
      const res = await axiosInstance.patch("/profile/changePassword", formData);
      if (res.data) {
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
        notify('success', res.data.message);
      }
      // console.log(res.data);
    } catch (err) {
      if (err) {
        console.log(err.response.data.message);
        notify('error', `${err.response.data.message}`);
      }
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
      className="space-y-4 max-w-md"
    >
      <div>
        <label className="block mb-1 text-sm">Current Pasoword</label>
        <input
          type="text"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          // className="w-full p-2 rounded-md dark:bg-white/5 text-yellow-400 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          className="block w-full rounded-md bg-gray-900/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-amber-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6 dark:bg-white/5  dark:outline-white/10 dark:placeholder:text-[#925e0a] dark:focus:outline-amber-500"
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
          // className="w-full p-2 rounded-md dark:bg-white/5 text-yellow-400 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          className="block w-full rounded-md bg-gray-900/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-amber-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6 dark:bg-white/5  dark:outline-white/10 dark:placeholder:text-[#925e0a] dark:focus:outline-amber-500"
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
          // className="w-full p-2 rounded-md dark:bg-white/5 text-yellow-400 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          className="block w-full rounded-md bg-gray-900/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-amber-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6 dark:bg-white/5  dark:outline-white/10 dark:placeholder:text-[#925e0a] dark:focus:outline-amber-500"
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
