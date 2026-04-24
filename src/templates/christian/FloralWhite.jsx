import { useEffect, useState } from "react";

export default function FloralWhite({ data }) {
  const mapLink = data?.mapLink
    ? data.mapLink
    : data?.venue
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venue)}`
    : null;

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
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setTimeLeft({ days, hours, minutes });
    }, 1000);
    return () => clearInterval(interval);
  }, [data.date, data.time]);

  return (
    /* 🛠 Change: Changed h-[500px] to min-h-[600px] and added max-h-[90vh] with overflow-y-auto */
    <div className="relative w-[350px] min-h-[600px] bg-[#FCFAF7] text-stone-800 p-8 flex flex-col shadow-xl border border-stone-100 font-serif overflow-hidden">
      
      {/* 🌸 Decorative Borders */}
      <div className="absolute top-3 left-3 right-3 bottom-3 border border-stone-200 pointer-events-none" />
      <div className="absolute top-1.5 left-1.5 right-1.5 bottom-1.5 border border-stone-100 pointer-events-none" />
      
      {/* HEADER */}
      <div className="relative z-10 text-center mb-4">
        <span className="text-[9px] tracking-[0.4em] uppercase text-stone-500">
          The Wedding of
        </span>
      </div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex-1 flex flex-col justify-center text-center">
        
        {/* 👰🤵 Names - Scaled slightly down to prevent line breaks */}
        <h1 className="text-3xl font-semibold leading-tight text-stone-900 tracking-wide">
          {data.groom || "Groom"}
          <span className="block text-lg text-rose-500 my-1 italic font-light">&</span>
          {data.bride || "Bride"}
        </h1>

        {/* Divider */}
        <div className="w-12 h-[1px] bg-rose-200 mx-auto my-4" />

        {/* 💌 Message - Tightened text size */}
        {data.message && (
          <p className="text-[12px] italic leading-relaxed text-stone-600 px-2 mb-4">
            "{data.message}"
          </p>
        )}

        {/* ⏳ Countdown - More compact layout */}
        {timeLeft && (
          <div className="mb-6 py-2 border-y border-stone-100 bg-stone-50/50">
            <p className="text-[9px] uppercase tracking-widest text-stone-400 mb-2">
              The Celebration Begins In
            </p>
            <div className="flex justify-center gap-4 text-sm font-medium text-stone-800">
              <div className="flex flex-col">
                <span className="text-base">{timeLeft.days}</span>
                <span className="text-[8px] uppercase text-stone-400">Days</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base">{timeLeft.hours}</span>
                <span className="text-[8px] uppercase text-stone-400">Hrs</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base">{timeLeft.minutes}</span>
                <span className="text-[8px] uppercase text-stone-400">Min</span>
              </div>
            </div>
          </div>
        )}

        {/* 📅 DETAILS */}
        <div className="space-y-4">
          <div className="space-y-0.5">
            <p className="text-sm font-bold tracking-widest text-stone-800 uppercase">
              {data.date || "Saturday, May 24th"}
            </p>
            <p className="text-[11px] text-stone-500 uppercase italic">
              At {data.time || "4:00 PM"}
            </p>
          </div>

          <div className="pt-1">
            <p className="text-[10px] uppercase tracking-widest text-rose-500 font-bold mb-1">
              Venue
            </p>
            {mapLink ? (
              <div className="flex flex-col items-center gap-1.5">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] leading-tight text-stone-700 px-4 underline decoration-rose-200 hover:text-rose-600 transition"
                >
                  {data.venue || "Location Details"}
                </a>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] bg-stone-100 px-3 py-1 rounded-full text-stone-600 hover:bg-rose-50 transition border border-stone-200"
                >
                  📍 Open Maps
                </a>
              </div>
            ) : (
              <p className="text-[12px] leading-tight text-stone-700 px-4">
                {data.venue || "Venue details"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 text-center mt-6">
        <div className="text-[9px] tracking-[0.3em] uppercase text-stone-400 border-t border-stone-100 pt-3">
          Reception to Follow
        </div>
      </div>

      {/* 🌸 Background Effects */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-stone-100 rounded-full blur-3xl opacity-50" />
    </div>
  );
}