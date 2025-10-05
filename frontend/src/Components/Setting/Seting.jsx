import { useState } from "react";
import Profile from "./Profile";
import Security from "./Security";
import Logout from "./Logout";

const tabs = [
  { id: "profile", label: "Profile Settings" },
  { id: "security", label: "Security" },
  { id: "logout", label: "Logout" },
  { id: "deleteAccount", label: "Delete Account" },
];

export default function Setting() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />
      case "security":
        return <Security />
      case "logout":
        return <Logout/>;
      case "deleteAccount":
        return <div>View and update billing details.</div>;
      default:
        return null;
    }
  };

  return (
    <>
      {/* <Nav /> */}
      <div className="min-h-screen flex items-start justify-center">
        <div className="shadow-md rounded-lg w-full max-w-5xl flex">
          {/* Left Sidebar */}
          <div className="w-1/4 border-r border-gray-300 dark:border-gray-800 px-2">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  className={`cursor-pointer px-4 py-2 rounded-md transition-all duration-200 ${activeTab === tab.id
                    ? "bg-zinc-200 dark:bg-zinc-800 text-gray-800 dark:text-yellow-600 font-medium"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content */}
          <div className="w-3/4 p-6">
            <h3 className="text-lg font-semibold mb-2">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h3>
            <div className="">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}