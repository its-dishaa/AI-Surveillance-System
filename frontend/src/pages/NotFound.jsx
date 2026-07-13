import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle
            size={42}
            className="text-red-600"
          />
        </div>

        <h1 className="text-5xl font-bold text-gray-800">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Home size={18} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;