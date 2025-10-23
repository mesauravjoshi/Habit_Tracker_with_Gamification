// ./Components/Pages/Setting/Profile.js
import { useState, useEffect, useContext } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from "@/api/axiosInstance";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    username: ""
  });
  const notify = (type) => {
    if (type === 'success') {
      toast.success('Profile Updated!');
    }
    if (type === 'error') {
      toast.error('Error Updating Profile!');
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/profile/profile", formData);
        // const res = await axios.get(`${url}/profile/profile`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });
        if (res.data) setFormData(res.data)
        // console.log(res.data);
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
      const res = await axiosInstance.patch(`/profile/profile`, formData,);

      if (res.data) {
        setFormData(res.data)
        notify('success')
      }
      // console.log(res.data);
    } catch (err) {
      notify('error')
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
        <label className="block mb-1 text-sm">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full rounded-md bg-gray-900/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-amber-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6 dark:bg-white/5  dark:outline-white/10 dark:placeholder:text-[#925e0a] dark:focus:outline-amber-500"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          // className="w-full p-2 rounded-md dark:bg-white/5 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          className="block w-full rounded-md bg-gray-900/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-amber-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6 dark:bg-white/5  dark:outline-white/10 dark:placeholder:text-[#925e0a] dark:focus:outline-amber-500"
          placeholder="Enter your username"
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md"
      >
        Update
      </button>
    </form>
  );
}
