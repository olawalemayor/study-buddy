"use client";

import Link from "next/link";
import { FaChrome, FaHome } from "react-icons/fa";

export default function NotSupported() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <FaChrome className="text-6xl text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Browser Not Supported</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Study Buddy requires Google Chrome version 138 or higher. Please update
        your browser or switch to a supported version.
      </p>
      <Link href="/" className="btn btn-primary flex items-center gap-2">
        <FaHome /> Back to Home
      </Link>
    </div>
  );
}
