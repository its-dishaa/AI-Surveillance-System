import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  Search,
  UserCircle,
  Settings,
  LogOut,
  User,
  Moon,
  CheckCircle2,
  ChevronRight,
  Shield,
  Camera,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
 const toggleDarkMode = () => {
  const next = !darkMode;

  setDarkMode(next);
  localStorage.setItem("theme", next ? "dark" : "light");

  setShowProfile(false);
};
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);

  const notifications = [
    {
      id: 1,
      title: "Person Detected",
      description: "Camera Lobby-1",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Vehicle Detected",
      description: "Parking Camera",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 3,
      title: "Video Processing Completed",
      description: "parking.mp4",
      time: "20 min ago",
      unread: false,
    },
    {
      id: 4,
      title: "Camera Connected",
      description: "Entrance Camera",
      time: "1 hour ago",
      unread: false,
    },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const unreadCount = notifications.filter(
    (n) => n.unread
  ).length;

  const profileMenu = [
    {
      icon: <User size={18} />,
      label: "My Profile",
      action: () => {
        navigate("/profile");
        setShowProfile(false);
      },
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      action: () => {
        navigate("/settings");
        setShowProfile(false);
      },
    },
   {
  icon: <Moon size={18} />,
  label: darkMode ? "Light Mode" : "Dark Mode",
  action: toggleDarkMode,
},
    
    {
      icon: <Shield size={18} />,
      label: "Security",
      action: () => {
        alert("Security Settings");
      },
    },
    {
      icon: <Camera size={18} />,
      label: "System Status",
      action: () => {
        alert("System Healthy");
      },
    },
  ];

     return (
<header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      {/* Left */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          AI Surveillance System
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Real-time Monitoring Dashboard
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="hidden items-center rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 md:flex dark:border-slate-700 dark:bg-slate-800">

          <Search size={18} className="mr-2 text-gray-500 dark:text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cameras, videos, tracks..."
            className="w-64 bg-transparent outline-none text-gray-800 placeholder-gray-500 dark:text-white dark:placeholder-gray-400"
          />

        </div>

        {/* Notifications */}

        <div
          className="relative"
          ref={notificationRef}
        >

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="relative rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-slate-700"
          >

            <Bell size={22}
            className="text-gray-700 dark:text-white"

            />

            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {unreadCount}
              </span>
            )}

          </button>

          {showNotifications && (

            <div className="absolute right-0 mt-3 w-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800">

              <div className="border-b px-5 py-4">

                <h3 className="text-lg font-semibold dark:text-white">
                  Notifications
                </h3>

              </div>

              {notifications.map((item) => (

                <div
                  key={item.id}
                  className="cursor-pointer border-b border-gray-200 px-5 py-4 transition hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700"
                >

                  <div className="flex items-center justify-between">

                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {item.title}
                    </h4>

                    {item.unread && (
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    )}

                  </div>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    {item.time}
                  </p>

                </div>

              ))}

              <button
                className="w-full bg-gray-50 py-3 text-sm font-medium transition hover:bg-gray-100 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-700"
              >
                View All Notifications
              </button>

            </div>

          )}

        </div>

        {/* Profile */}

        <div
          className="relative"
          ref={profileRef}
        >

          <button
            onClick={() =>
              setShowProfile(!showProfile)
            }
            className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-gray-100 dark:hover:bg-slate-700"
          >

            <UserCircle
              size={40}
              className="text-gray-700 dark:text-white"
            />

            <div className="hidden text-left sm:block">

              <p className="font-semibold text-gray-800 dark:text-white">
    Admin
</p>

<p className="text-xs text-gray-500 dark:text-gray-400">
    System Operator
</p>

            </div>

          </button>

          {showProfile && (

            <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800">

              <div className="border-b border-gray-200 bg-gray-50 px-5 py-5 dark:border-slate-700 dark:bg-slate-900">

                <div className="flex items-center gap-3">

                  <UserCircle
                    size={55}
                    className="text-blue-600"
                  />

                  <div>

                    <p className="font-semibold text-gray-800 dark:text-white">
                      Admin
                    </p>

                    <p className="text-sm text-gray-500">
                      admin@surveillance.com
                    </p>

                  </div>

                </div>

              </div>

              {profileMenu.map((item) => (

                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex w-full items-center justify-between px-5 py-4 text-gray-700 transition hover:bg-gray-50 dark:text-white dark:hover:bg-slate-700"
                >

                  <div className="flex items-center gap-3">

                    {item.icon}

                    {item.label}

                  </div>

                  <ChevronRight size={16} />

                </button>

              ))}

              <div className="border-t">

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                  className="flex w-full items-center gap-3 px-5 py-4 text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/30"
                >

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;