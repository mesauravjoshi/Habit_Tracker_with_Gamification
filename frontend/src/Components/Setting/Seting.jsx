import { useState } from "react";

const tabs = [
  { id: "profile", label: "Profile Settings" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "billing", label: "Billing Info" },
];

export default function Setting() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <div>Update your name, email, and profile picture.</div>;
      case "security":
        return <div>Change your password and 2FA preferences.</div>;
      case "notifications":
        return <div>Manage your email and push notifications.</div>;
      case "billing":
        return <div>View and update billing details.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-start justify-center">
      <div className="shadow-md rounded-lg w-full max-w-5xl flex">
        {/* Left Sidebar */}
        <div className="w-1/4 border-r border-gray-200 p-4">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`cursor-pointer px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
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
          <div className="text-gray-700">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
