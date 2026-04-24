import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Force a re-render or redirect to home
    navigate("/");
    window.location.reload(); 
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-stone-100 px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand */}
        <Link 
          to="/" 
          className="group flex items-center gap-1.5 text-xl font-serif tracking-tight text-stone-800"
        >
          <span className="w-8 h-8 bg-rose-600 text-white flex items-center justify-center rounded-lg font-sans font-bold text-sm group-hover:rotate-12 transition-transform">
            M
          </span>
          <span className="hidden sm:block">
            my<span className="text-rose-600 italic">Invite</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 md:gap-8">
          <Link 
            to="/editor" 
            className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors"
          >
            Design Studio
          </Link>

          <div className="h-4 w-[1px] bg-stone-200 hidden sm:block" />

          {token ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="text-sm font-medium text-stone-600 hover:text-stone-900"
              >
                My Invites
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-rose-600 border border-rose-100 bg-rose-50 px-4 py-2 rounded-full hover:bg-rose-100 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-stone-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black hover:shadow-lg hover:shadow-stone-200 transition-all active:scale-95"
            >
              Sign In
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
}