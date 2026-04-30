export default function WeddingLoader({ onEnter }) {
  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center overflow-hidden ">

      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes softPulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .animate-entrance {
          animation: fadeInScale 1s ease-out forwards;
        }

        .animate-logo {
          animation: softPulse 2.5s ease-in-out infinite;
        }

        .shimmer-btn {
          background: linear-gradient(110deg, #1c1917 45%, #44403c 50%, #1c1917 55%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite linear;
        }
          
      `}</style>

      {/* 🖼️ BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="/images/loadingbg.jpeg"
          alt="bg"
          className="w-full h-full object-cover grayscale blur-[5px] scale-105"
        />

        {/* overlay for readability */}
        <div className="absolute inset-0 bg-[#FDFBF8]/70 backdrop-blur-[2px]" />
      </div>

      {/* 🌸 SOFT GLOW (keep wedding feel) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-rose-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-stone-100 rounded-full blur-3xl opacity-30" />
      </div>

      {/* CONTENT */}
      <div className="relative flex flex-col items-center gap-8 animate-entrance">

        {/* LOGO */}
        <img
          src="/images/aglogo.png"
          alt="AG Logo"
          className="w-26 opacity-90 animate-logo"
        />

        {/* Names */}
        <p className="text-[19px] text-stone-500 tracking-[0.5em] uppercase text-center">
          George ✦ Ann Mary
        </p>

        {/* BUTTON */}
        <button
          onClick={onEnter}
          className="shimmer-btn mt-6 px-8 py-3 rounded-full text-white text-[11px] uppercase tracking-[0.3em] shadow-xl active:scale-95 transition"
        >
          View Invitation
        </button>

        <p className="text-[12px] text-stone-400 uppercase tracking-[0.3em]">
          Tap to enter
        </p>

      </div>
    </div>
  );
}