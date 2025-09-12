import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer bg-base-200 text-base-content p-6 mt-10 border-t">
      <div className="flex flex-col md:flex-row justify-between w-full">
        {/* Left Section */}
        <div>
          <h2 className="font-bold text-lg text-primary">Study Buddy</h2>
          <p className="text-sm mt-1">
            AI-powered learning made simple & accessible.
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Built for Hackathon 2025 ✨
          </p>
        </div>

        {/* Center Links */}
        <nav className="mt-4 md:mt-0 flex gap-6">
          <Link href="/" className="link link-hover">
            Home
          </Link>
          <Link href="/quiz" className="link link-hover">
            Quiz
          </Link>
          <Link href="/about" className="link link-hover">
            About
          </Link>
          <a
            href="https://github.com/olawalemayor"
            target="_blank"
            rel="noreferrer"
            className="link link-hover">
            GitHub
          </a>
        </nav>

        {/* Right Social Icons */}
        <div className="mt-4 md:mt-0 flex gap-4 text-lg">
          <a
            href="https://github.com/olawalemayor"
            target="_blank"
            rel="noreferrer">
            <FaGithub />
          </a>
          <a href="https://x.com/olawalemayor" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}
