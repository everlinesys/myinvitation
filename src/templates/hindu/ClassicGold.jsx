import { useEffect, useState } from "react";

export default function ClassicGold({ data }) {
  // 📍 Map Link Generation
  const mapLink = data?.venue 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venue)}`
    : null;

  // ⏳ Countdown Logic
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!data?.date) return;
    // Note: Ensuring the date string is compatible with the Date constructor
    const target = new Date(`${data.date} ${data.time || ""}`);
    
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data.date, data.time]);

  return (
    <div className="relative w-[350px] min-h-[600px] bg-[#7c0a02] text-[#f8e4a5] p-8 flex flex-col shadow-2xl border-[10px] border-[#8e120a] font-serif overflow-hidden">
      
      {/* 🏛️ TRADITIONAL ORNAMENTAL BORDER */}
      <div className="absolute inset-2 border-2 border-[#f8e4a5]/30 pointer-events-none" />
      <div className="absolute inset-4 border border-[#f8e4a5]/10 pointer-events-none" />

      {/* TOP SYMBOL */}
      <div className="relative z-10 text-center flex flex-col items-center mb-4">
        <div className="text-2xl mb-1 opacity-95 animate-pulse">🕉️</div>
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#f8e4a5]/50 to-transparent" />
        <p className="text-[9px] tracking-[0.4em] uppercase mt-3 opacity-70 font-sans">
          Wedding Invitation
        </p>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10 flex-1 flex flex-col justify-center text-center space-y-4">
        {data.message && (
          <p className="text-[12px] italic leading-relaxed opacity-80 px-4 font-light">
            "{data.message}"
          </p>
        )}

        <div className="py-2">
          <h1 className="text-3xl font-medium tracking-wider drop-shadow-md">
            {data.groom || "Groom Name"}
          </h1>
          
          <div className="flex items-center justify-center my-1">
            <div className="h-[1px] w-10 bg-[#f8e4a5]/20" />
            <span className="mx-3 text-lg font-light italic text-[#f8e4a5]/60">weds</span>
            <div className="h-[1px] w-10 bg-[#f8e4a5]/20" />
          </div>

          <h1 className="text-3xl font-medium tracking-wider drop-shadow-md">
            {data.bride || "Bride Name"}
          </h1>
        </div>

        {/* ⏳ COUNTDOWN TIMER */}
        {timeLeft && (
          <div className="bg-[#f8e4a5]/5 border-y border-[#f8e4a5]/20 py-3 my-2">
            <p className="text-[9px] uppercase tracking-[0.3em] mb-2 opacity-60">The Big Day In</p>
            <div className="flex justify-center gap-5 text-[#f8e4a5]">
              <div className="text-center">
                <span className="block text-lg leading-none font-semibold">{timeLeft.days}</span>
                <span className="text-[8px] uppercase tracking-widest opacity-60">Days</span>
              </div>
              <div className="text-center">
                <span className="block text-lg leading-none font-semibold">{timeLeft.hours}</span>
                <span className="text-[8px] uppercase tracking-widest opacity-60">Hrs</span>
              </div>
              <div className="text-center">
                <span className="block text-lg leading-none font-semibold">{timeLeft.minutes}</span>
                <span className="text-[8px] uppercase tracking-widest opacity-60">Mins</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LOGISTICS CARD */}
      <div className="relative z-10 text-center space-y-3 mt-4">
        <div className="bg-black/20 p-4 rounded-xl border border-[#f8e4a5]/20 shadow-inner">
          <div className="mb-2">
            <p className="text-[13px] font-bold tracking-[0.2em] uppercase">
              {data.date || "Sunday, Dec 14, 2026"}
            </p>
            <p className="text-[11px] opacity-80 uppercase tracking-widest mt-1 italic">
              {data.time || "Muhurtham at 10:30 AM"}
            </p>
          </div>
          
          <div className="w-8 h-[1px] bg-[#f8e4a5]/30 mx-auto my-3" />
          
          <p className="text-[12px] leading-snug px-2 mb-3">
            {data.venue || "Venue Location"}
          </p>

          {mapLink && (
            <a 
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] bg-[#f8e4a5] text-[#7c0a02] px-5 py-2 rounded-lg font-bold hover:bg-white transition-all transform active:scale-95"
            >
              📍 Navigate to Venue
            </a>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 text-center mt-6">
        <p className="text-[9px] font-medium tracking-[0.2em] uppercase opacity-50 border-t border-[#f8e4a5]/10 pt-4">
          With Love from Families & Friends
        </p>
      </div>

      {/* DECORATIVE CORNER GLOW */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#f8e4a5]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#f8e4a5]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}