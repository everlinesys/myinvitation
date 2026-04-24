import { useEffect, useState } from "react";

export default function ElegantGreen({ data }) {
  // 📍 Map Link Generation
  const mapLink = data?.venue 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venue)}`
    : null;

  // ⏳ Countdown Logic
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!data?.date) return;
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
    <div className="relative w-[350px] min-h-[600px] bg-[#062c1e] text-[#f3e3b4] p-8 flex flex-col shadow-2xl border-[12px] border-[#0a3d2a] font-serif overflow-hidden">
      
      {/* 🌙 GEOMETRIC OVERLAY */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 30-15 30L15 30z' fill='%23f3e3b4' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} 
      />

      {/* INNER GOLD BORDER */}
      <div className="absolute inset-3 border border-[#f3e3b4]/30 pointer-events-none" />

      {/* BISMILLAH */}
      <div className="relative z-10 text-center mb-6">
        <p className="text-lg leading-relaxed mb-1 opacity-90 drop-shadow-sm">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيم
        </p>
        <div className="w-16 h-[1px] bg-[#f3e3b4]/40 mx-auto mt-2" />
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-10 flex-1 flex flex-col justify-center text-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-medium tracking-wide">
            {data.groom || "Groom Name"}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-[#f3e3b4]/20" />
            <span className="italic font-light text-xl text-[#f3e3b4]/60">&</span>
            <div className="h-[1px] w-8 bg-[#f3e3b4]/20" />
          </div>
          <h1 className="text-3xl font-medium tracking-wide">
            {data.bride || "Bride Name"}
          </h1>
        </div>

        {data.message && (
          <p className="mt-4 text-[12px] leading-relaxed italic opacity-80 px-2 font-light">
            "{data.message}"
          </p>
        )}

        {/* ⏳ TIMER */}
        {timeLeft && (
          <div className="mt-6 py-3 border-y border-[#f3e3b4]/10">
            <p className="text-[9px] uppercase tracking-[0.3em] mb-2 opacity-50">Counting Down</p>
            <div className="flex justify-center gap-5">
              <div className="text-center">
                <span className="block text-lg font-medium">{timeLeft.days}</span>
                <span className="text-[8px] uppercase tracking-widest opacity-60">Days</span>
              </div>
              <div className="text-center">
                <span className="block text-lg font-medium">{timeLeft.hours}</span>
                <span className="text-[8px] uppercase tracking-widest opacity-60">Hrs</span>
              </div>
              <div className="text-center">
                <span className="block text-lg font-medium">{timeLeft.minutes}</span>
                <span className="text-[8px] uppercase tracking-widest opacity-60">Min</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* EVENT LOGISTICS */}
      <div className="relative z-10 text-center space-y-4 mt-6">
        <div className="space-y-1">
          <p className="text-[13px] font-semibold tracking-[0.2em] uppercase">
            {data.date || "Friday, Oct 24, 2026"}
          </p>
          <p className="text-xs opacity-70 uppercase tracking-widest italic">
            {data.time || "8:00 PM onwards"}
          </p>
        </div>

        <div className="bg-[#f3e3b4]/5 py-3 px-4 rounded-xl border border-[#f3e3b4]/10 space-y-2">
          <p className="text-[9px] uppercase tracking-[0.3em] opacity-50">The Venue</p>
          <p className="text-[13px] leading-snug px-2">
            {data.venue || "Venue Address"}
          </p>
          
          {mapLink && (
            <a 
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest bg-[#f3e3b4] text-[#062c1e] px-4 py-1.5 rounded-full font-bold hover:bg-white transition-colors"
            >
              📍 View Map
            </a>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 text-center pt-6">
        <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#f3e3b4]/30 border-t border-[#f3e3b4]/10 pt-4">
          Nikah Ceremony
        </div>
      </div>

      {/* CORNER GLOW */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#f3e3b4]/5 rounded-full blur-[60px]" />
    </div>
  );
}