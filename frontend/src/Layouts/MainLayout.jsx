import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "@/Context/ThemeProvider";

import { Home, AddHabit, TrackHabit, Archive, Completed, Badges, Setting, Bars3Icon, SunIcon, MoonIcon } from '@/assets/Icons/SliderIcon';
import { Toaster } from 'react-hot-toast';
import LogOutPopUp from "@/Components/Modals/LogOutModal";
import { AuthContext } from "@/Context/AuthContext";
import axios from "axios";
import ProfileDropDown from "@/Components/ProfileDropDown";

const navigation = [
  // { name: "Home", to: "/", icon: Home },
  { name: "Add Habit", to: "/habit", icon: AddHabit },
  { name: "Track Streak", to: "/track-streak", icon: TrackHabit },
  { name: "Archive", to: "/archive", icon: Archive },
  { name: "Completed", to: "/completed", icon: Completed },
  { name: "Badges", to: "/badges", icon: Badges },
];

const userNavigation = [
  // { name: 'Your profile', href: '#' },
  { name: 'Setting', href: '/setting' },
  { name: 'Sign In', href: 'auth' },
  { name: 'Sign out' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function MainLayout() {
  const [isLogOutPopUpOpen, setIsLogOutPopUpOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
      <Toaster />
      <div className="bg-gray-50 dark:bg-gray-900">
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-2 left-full flex w-10 justify-center duration-300 ease-in-out data-closed:opacity-0 text-lg">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5 text-gray-50 dark:text-amber-600">
                    <span className="sr-only">Close sidebar</span>
                    X
                  </button>
                </div>
              </TransitionChild>

              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 dark:bg-gray-900 px-6 pb-4 ring-1 ring-white/10 dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 ">
                <Link to={'/home'}>
                  <div className="flex h-16 shrink-0 items-center gap-x-2">
                    {/* <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                /> */}
                    <span className="text-lg text-rose-500 font-bold">
                      HabitQuest
                    </span>
                  </div>
                </Link>
                <nav className="relative flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.to}
                              className={({ isActive }) =>
                                classNames(
                                  isActive
                                    ? " bg-gray-200  dark:bg-white/5 dark:text-amber-500"
                                    : "hover:bg-gray-200 dark:hover:bg-white/5 hover:text-amber dark:text-amber-500",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )
                              }
                            >
                              <item.icon aria-hidden="true" className="size-6 shrink-0" />
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>

                    </li>
                    <li className="mt-auto">
                      <NavLink
                        to="/setting"
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? " bg-gray-200  dark:bg-white/5 dark:text-amber-500"
                              : "hover:bg-gray-200 dark:hover:bg-white/5 hover:text-amber dark:text-amber-500",
                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          )
                        }
                      >
                        <Setting aria-hidden="true" className="size-6 shrink-0" />
                        Settings
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 dark:bg-black/10 px-6 pb-4">
            <Link to={'/home'}>
              <div className="flex h-16 shrink-0 items-center gap-x-2">
                {/* <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                /> */}
                <span className="text-lg text-rose-500 font-bold">
                  HabitQuest
                </span>
              </div>
            </Link>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-200  dark:bg-white/5"
                                : "hover:bg-gray-200 dark:hover:bg-white/5 hover:text-amber",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                            )
                          }
                        >
                          <item.icon aria-hidden="true" className="size-6 shrink-0" />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>

                </li>
                <li className="mt-auto">
                  <NavLink
                    to="/setting"
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? " bg-gray-200  dark:bg-white/5 dark:text-amber-500"
                          : "hover:bg-gray-200 dark:hover:bg-white/5 hover:text-amber dark:text-amber-500",
                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                      )
                    }                  >
                    <Setting aria-hidden="true" className="size-6 shrink-0" />
                    Settings
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-gray-50 px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8 dark:border-white/10 dark:bg-gray-900">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:text-white"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="grid flex-1 grid-cols-1">
                <div className="col-start-1 row-start-1 block size-full bg-gray-50 pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500">
                </div>
              </div>
              <div className="flex items-center gap-x-2 lg:gap-x-6">
                <button type="button" className=" text-gray-400 hover:text-gray-500"
                  onClick={toggleTheme}>
                  <span className="sr-only">View notifications</span>
                  {theme === "dark" ?
                    <MoonIcon aria-hidden="true" className="size-6" />
                    :
                    <SunIcon aria-hidden="true" className="size-6" />
                  }
                </button>

                {/* Separator */}
                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

                {/* Profile dropdown */}
                <ProfileDropDown
                  setIsLogOutPopUpOpen={setIsLogOutPopUpOpen}
                />
              </div>
            </div>
          </div>

          <main className="py-3">
            <div className="px-4 sm:px-6 lg:px-8">  <Outlet /> </div>
          </main>
        </div>
      </div>

      {
        isLogOutPopUpOpen &&
        <LogOutPopUp setIsLogOutPopUpOpen={setIsLogOutPopUpOpen} />
      }
    </>
  );
}