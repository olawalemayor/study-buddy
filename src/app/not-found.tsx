import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-6">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary flex items-center gap-2">
        <FaHome />
        Back to Home
      </Link>
    </div>
  );
}
