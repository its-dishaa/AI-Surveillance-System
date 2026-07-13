import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 transition-colors duration-300 dark:bg-slate-900">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-6 text-gray-900 dark:text-white">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;