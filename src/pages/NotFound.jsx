import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      
      {/* Title */}
      <h1 className="text-5xl font-semibold">
        404
      </h1>

      <p className="mt-3 text-gray-600 text-lg">
        This invitation seems lost...
      </p>

      <p className="text-sm text-gray-500 mt-1">
        The page you’re looking for doesn’t exist.
      </p>

      {/* CTA */}
      <Link
        to="/"
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Back to Home
      </Link>

    </div>
  );
}