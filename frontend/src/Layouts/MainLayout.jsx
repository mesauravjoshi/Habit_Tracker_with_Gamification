import { useState, useContext } from "react";
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
import { useTheme } from "@/Components/Context/ThemeProvider";

import { Home, AddHabit, TrackHabit, Archive, Completed, Badges, Setting, Bars3Icon, ChevronDownIcon, SunIcon, MoonIcon, MagnifyingGlassIcon } from "@/Components/Slider/SliderIcon";
import { Toaster } from 'react-hot-toast';

const navigation = [
  { name: "Home", to: "/", icon: Home },
  { name: "Add Habit", to: "/habit", icon: AddHabit },
  { name: "Track Streak", to: "/track-streak", icon: TrackHabit },
  { name: "Archive", to: "/archive", icon: Archive },
  { name: "Completed", to: "/completed", icon: Completed },
  { name: "Badges", to: "/badges", icon: Badges },
];

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
  { name: 'Setting', href: '/setting' },
  { name: 'Sign In', href: 'auth' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function MainLayout() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };
  const { theme, toggleTheme } = useTheme();
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
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    {/* <XMarkIcon aria-hidden="true" className="size-6 text-white" /> */}
                  </button>
                </div>
              </TransitionChild>

              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 dark:bg-gray-900 px-6 pb-4 ring-1 ring-white/10 dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 ">
                <div className="relative flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </div>
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
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
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
              <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                <input
                  name="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="col-start-1 row-start-1 block size-full bg-gray-50 pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
                />
                {/* <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
              /> */}
              </form>
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
                <Menu as="div" className="relative">
                  <MenuButton className="relative flex items-center">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900 dark:text-amber-500">
                        Name
                      </span>
                      <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-gray-50 py-2 shadow-lg outline outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <Link
                          to={item.href}
                          className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-amber-50 data-focus:outline-hidden dark:text-amber-500 dark:data-focus:bg-amber-100"
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">  <Outlet /> </div>
          </main>
        </div>
      </div>
    </>
  );
}