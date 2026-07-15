import { Bell, Moon, Search, Sun, Menu } from "lucide-react";
import { useState } from "react";

function Navbar({ toggleSidebar }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">

      {/* Left */}

      <div className="flex items-center gap-4">

        <button
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={22} />
        </button>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search cameras, videos, events..."
            className="
              w-96
              rounded-xl
              border
              border-gray-300
              py-2.5
              pl-10
              pr-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        <button className="relative rounded-full p-2 hover:bg-gray-100">

          <Bell size={20} />

          <span className="
            absolute
            right-2
            top-2
            h-2
            w-2
            rounded-full
            bg-red-500
          "></span>

        </button>

        <div className="flex items-center gap-3">

          <div className="
            h-10
            w-10
            rounded-full
            bg-blue-600
            flex
            items-center
            justify-center
            text-white
            font-bold
          ">
            A
          </div>

          <div>

            <h3 className="font-semibold text-sm">
              Admin
            </h3>

            <p className="text-xs text-gray-500">
              Security Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;