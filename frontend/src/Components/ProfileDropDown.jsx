import { useState, useEffect, useContext } from "react";
import "../App.css";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Link } from "react-router-dom";

import { ChevronDownIcon } from "@/icons/SliderIcon";
import { AuthContext } from "@/Context/AuthContext";
import axios from "axios";

const userNavigation = [
  // { name: 'Your profile', href: '#' },
  { name: 'Setting', href: '/setting' },
  // { name: 'Sign In', href: '/auth' },
  { name: 'Sign out' },
]

export default function ProfileDropDown({ setIsLogOutPopUpOpen }) {
  const [gravatarUrl, setGravatarUrl] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const generateGravatar = async () => {
      if (user) {
        const username = user.username.trim().toLowerCase();
        try {
          const response = await axios.get(`https://api.hashify.net/hash/md5/hex?value=${username}`);
          const hash = response.data?.Digest
          if (hash) {
            setGravatarUrl(`https://www.gravatar.com/avatar/${hash}?d=identicon`);
          }
        } catch (error) {
          console.error('Failed to fetch MD5 hash for Gravatar:', error);
        }
      }
    };
    generateGravatar();
  }, [user]);

  return (
    <>
      <Menu as="div" className="relative">
        <MenuButton className="relative flex items-center">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {
            gravatarUrl &&
            <img
              alt="Profile image"
              src={gravatarUrl}
              className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5"
            />
          }
          <span className="hidden lg:flex lg:items-center">
            <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900 dark:text-amber-500">
              {user && user.name}
            </span>
            <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
          </span>
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-gray-50 py-2 shadow-lg outline outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
        >
          {userNavigation.map((item) => {
            if (item.name === 'Sign out') {
              return (
                <MenuItem key={item.name}>
                  <button
                    onClick={() => setIsLogOutPopUpOpen(true)}
                    className="block px-3 py-1 text-sm/6 text-gray-900 dark:text-amber-500"
                  >
                    {item.name}
                  </button>
                </MenuItem>
              );
            }

            return (
              <MenuItem key={item.name}>
                <Link
                  to={item.href}
                  className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-amber-50 data-focus:outline-hidden dark:text-amber-500 dark:data-focus:bg-amber-100"
                >
                  {item.name}
                </Link>
              </MenuItem>
            );
          })}

        </MenuItems>
      </Menu>
    </>
  );
}