import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Camera,
  Video,
  BarChart3,
  Route,
  TriangleAlert,
  Settings,
  Shield,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Upload Video",
    path: "/upload",
    icon: Upload,
  },
  {
    title: "Cameras",
    path: "/cameras",
    icon: Camera,
  },
  {
    title: "Videos",
    path: "/videos",
    icon: Video,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Tracks",
    path: "/tracks",
    icon: Route,
  },
  {
    title: "Events",
    path: "/events",
    icon: TriangleAlert,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="h-16 flex items-center px-6 border-b border-slate-800">

        <div className="bg-blue-600 rounded-lg p-2 mr-3">

          <Shield size={22} />

        </div>

        <div>

          <h1 className="font-bold text-lg">

            Sentinel AI

          </h1>

          <p className="text-xs text-slate-400">

            Surveillance Suite

          </p>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 px-3 py-5">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 mb-2 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-slate-800 text-slate-300"
                }`
              }
            >

              <Icon size={18} />

              <span>{item.title}</span>

            </NavLink>

          );
        })}
      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-4">

        <p className="text-xs text-slate-500">

          v1.0.0

        </p>

        <p className="text-xs text-green-400">

          ● System Online

        </p>

      </div>

    </aside>
  );
}

export default Sidebar;