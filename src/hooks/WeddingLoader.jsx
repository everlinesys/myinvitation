export default function WeddingLoader() {
  return (
    <div className="fixed inset-0 bg-[#FDFBF8] flex items-center justify-center z-[999] overflow-hidden">
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.9; }
        }
        @keyframes progress {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 50%; transform: translateX(0%); }
          100% { width: 100%; transform: translateX(100%); }
        }

        .animate-draw {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: draw 3s cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }
        .animate-entrance {
          animation: fadeInScale 1.2s ease-out forwards;
        }
        .animate-heart {
          animation: pulseHeart 2s infinite ease-in-out;
        }
        .animate-progress {
          animation: progress 2.5s infinite ease-in-out;
        }
      `}</style>

      {/* 🌸 Ambient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(251,232,232,0.3)_0%,_rgba(253,251,248,0)_70%)]" />
      </div>

      <div className="relative flex flex-col items-center animate-entrance">
        
        {/* ✝️ Pattern Icon */}
        <div className="mb-10 opacity-30">
          <img
            src="/images/patterns/aramaic.png"
            alt="logo"
            className="w-8 h-auto"
          />
        </div>

        {/* 💍 G ❤️ A Monogram (Slow Drawing SVG) */}
        <div className="flex items-center gap-8 mb-16">
          {/* SVG for letter G */}
          <svg width="60" height="70" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M40 15C37 10 32 7 25 7C15 7 8 15 8 30C8 45 15 53 25 53C35 53 40 45 42 35H25" 
              stroke="#57534e" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-draw"
            />
          </svg>
          
          {/* Pulsing Heart */}
          <div className="animate-heart mt-1">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fda4af">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* SVG for letter A */}
          <svg width="60" height="70" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M10 53L25 7L40 53M15 38H35" 
              stroke="#57534e" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-draw"
              style={{ animationDelay: '0.5s' }}
            />
          </svg>
        </div>

        {/* ✨ Loading Content */}
        <div className="flex flex-col items-center gap-5">
          <div className="text-center">
            <p className="text-[11px] text-stone-400 tracking-[0.5em] uppercase font-light">
              George & Ann Mary
            </p>
          </div>

          {/* Modern Minimalist Progress Line */}
          <div className="w-44 h-[1px] bg-stone-100 relative overflow-hidden">
            <div className="h-full bg-rose-200 animate-progress" />
          </div>
          
          <p className="text-[9px] text-stone-300 tracking-[0.3em] uppercase mt-2">
            Opening Invitation
          </p>
        </div>

      </div>
    </div>
  );
}