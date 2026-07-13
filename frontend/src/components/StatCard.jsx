import React from "react";

function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
            {value ?? 0}
          </h2>
        </div>

        {Icon && (
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full ${color}`}
          >
            <Icon size={28} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;