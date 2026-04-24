import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state?.data || null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const endpoint = isLogin ? "login" : "register";

      const res = await fetch(
        `https://premiumweddingcards.trato.in/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        throw new Error("Server error. Check backend.");
      }

      if (!res.ok) {
        throw new Error(data.error || "Auth failed");
      }

      localStorage.setItem("token", data.token);

      navigate("/editor", {
        state: { restoredData: formData },
      });

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center px-4">
      
      {/* 💡 Progress Indicator (UX touch) */}
      {formData && (
        <div className="mb-8 flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-full animate-pulse">
          <div className="w-2 h-2 bg-rose-400 rounded-full" />
          <span className="text-[10px] uppercase tracking-widest font-semibold text-rose-600">
            Saving your invitation progress
          </span>
        </div>
      )}

      <div className="w-full max-w-[400px] bg-white border border-stone-100 shadow-2xl shadow-stone-200/50 rounded-[2rem] p-8 md:p-10 space-y-8">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-serif text-stone-800 tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-stone-400 font-light">
            {isLogin 
              ? "Login to manage and send your invitations" 
              : "Join us to start creating beautiful memories"}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-1">Email Address</label>
            <input
              className="w-full bg-stone-50 border border-stone-100 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all placeholder:text-stone-300"
              placeholder="e.g. alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-1">Password</label>
            <input
              type="password"
              className="w-full bg-stone-50 border border-stone-100 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all placeholder:text-stone-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-stone-900 text-white py-4 rounded-xl font-medium shadow-lg shadow-stone-200 hover:bg-black active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Authenticating...
              </span>
            ) : (
              isLogin ? "Login" : "Continue"
            )}
          </button>

          <p className="text-sm text-center text-stone-500 font-light">
            {isLogin ? "New to the platform?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-rose-600 hover:text-rose-700 underline underline-offset-4 decoration-rose-200"
            >
              {isLogin ? "Register now" : "Login here"}
            </button>
          </p>
        </div>
      </div>

      {/* Footer branding */}
      <p className="mt-8 text-[11px] text-stone-400 tracking-[0.2em] uppercase font-medium">
        Secure Wedding Portal • 2026
      </p>
    </div>
  );
}