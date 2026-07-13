import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Camera,
  Video,
  Upload,
  BarChart3,
  Activity,
  Route,
  MonitorPlay,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Cameras",
    path: "/cameras",
    icon: Camera,
  },
  {
    name: "Videos",
    path: "/videos",
    icon: Video,
  },
  {
    name: "Upload",
    path: "/upload",
    icon: Upload,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Events",
    path: "/events",
    icon: Activity,
  },
  {
    name: "Tracks",
    path: "/tracks",
    icon: Route,
  },
  {
    name: "Streaming",
    path: "/streaming",
    icon: MonitorPlay,
  },
];

function Sidebar() {
  return (
    <aside
      className="
        w-64
        min-h-screen
        border-r
        border-gray-200
        bg-white
        text-gray-800
        shadow-lg
        transition-colors
        duration-300

        dark:bg-slate-900
        dark:border-slate-700
        dark:text-white
      "
    >
      <div className="border-b border-gray-200 px-6 py-6 dark:border-slate-700">
        <h1 className="text-2xl font-bold tracking-wide">
          AI Surveillance
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          Monitoring Dashboard
        </p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-6 py-3
                transition-all duration-200

                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }
              `
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;