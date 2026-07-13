import React from "react";

function Table({
  columns = [],
  data = [],
  actions,
  emptyMessage = "No data available.",
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide"
              >
                {column.header}
              </th>
            ))}

            {actions && (
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={row.id ?? index}
                className="border-t hover:bg-gray-50 transition"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-5 py-4 text-sm text-gray-700"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key] ?? "-"}
                  </td>
                ))}

                {actions && (
                  <td className="px-5 py-4 text-center">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-5 py-8 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;