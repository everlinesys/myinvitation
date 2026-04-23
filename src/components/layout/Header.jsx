import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm px-4 md:px-8 py-4 flex justify-between items-center">
      
      {/* Brand */}
      <Link to="/" className="text-lg font-semibold tracking-wide">
        my<span className="text-red-600">IN</span>vitation
      </Link>

      {/* Nav */}
      <nav className="flex gap-4 text-sm">
        <Link to="/editor" className="hover:text-red-600">
          Create
        </Link>
      </nav>

    </header>
  );
}