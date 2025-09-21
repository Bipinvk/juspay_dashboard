// Notifications.tsx
import React from "react";
import { Bug, UserPlus, BellRing, Radio } from "lucide-react";
import clsx from "clsx";

const Notifications: React.FC = () => {
  const notifications = [
    { text: "You have a bug that needs...", time: "Just now", icon: Bug },
    { text: "New user registered", time: "59 minutes ago", icon: UserPlus },
    { text: "You have a bug that needs...", time: "12 hours ago", icon: Bug },
    { text: "Andi Lane subscribed to you", time: "Today, 11:59 AM", icon: Radio },
  ];

  const activities = [
    { text: "You have a bug that needs...", time: "Just now", icon: Bug },
    { text: "Released a new version", time: "59 minutes ago", icon: BellRing },
    { text: "Submitted a bug", time: "12 hours ago", icon: Bug },
    { text: "Modified A data in Page X", time: "Today, 11:59 AM", icon: BellRing },
    { text: "Deleted a page in Project X", time: "Feb 2, 2023", icon: BellRing },
  ];

  const contacts = [
    { name: "Natali Craig", color: "bg-gray-400" },
    { name: "Drew Cano", color: "bg-red-600" },
    { name: "Orlando Diggs", color: "bg-yellow-600" },
    { name: "Andi Lane", color: "bg-green-500" },
    { name: "Kate Morrison", color: "bg-blue-500" },
    { name: "Koray Okumus", color: "bg-purple-500" },
  ];

  return (
    <div className="h-screen bg-mainBg p-4 border-l border-borderColor overflow-y-auto text-textColor">
      {/* Notifications Section */}
      <div>
        <h4 className="text-base font-semibold mb-3 text-textColor">Notifications</h4>
        <div className="space-y-4">
          {notifications.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-200/50 rounded-xl">
                  <Icon className="w-4 h-4 text-textSecondary" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="text-textColor">{item.text}</span>
                  <span className="text-textSecondary text-xs">{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activities Section */}
      <div className="mt-6">
        <h4 className="text-base font-semibold mb-3 text-textColor">Activities</h4>
        <div className="space-y-4">
          {activities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-secondaryBg rounded-full">
                  <Icon className="w-4 h-4 text-textSecondary" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="text-textColor">{item.text}</span>
                  <span className="text-textSecondary text-xs">{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contacts Section */}
      <div className="mt-6">
        <h4 className="text-base font-semibold mb-3 text-textColor">Contacts</h4>
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <div
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white",
                  contact.color
                )}
              >
                {contact.name.charAt(0)}
              </div>
              <span className="text-textColor">{contact.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
