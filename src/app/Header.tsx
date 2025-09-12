import Link from "next/link";

export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-md px-6">
      {/* Logo / Brand */}
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold text-primary">
          Study Buddy
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/quiz">Quiz</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
