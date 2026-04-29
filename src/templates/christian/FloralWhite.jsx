import { useEffect, useState } from "react";

export default function FloralWhite({ data }) {
  const mapLink = data?.mapLink
    ? data.mapLink
    : data?.venue
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        data.venue
      )}`
      : null;

  // const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const target = new Date("June 10 2026 15:00:00");

    const interval = setInterval(() => {
      const diff = target - new Date();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const target = new Date("June 10 2026 15:00:00");

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
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full w-[460px] max-w-[90vw] bg-[#FCFAF7] p-8 text-center font-serif text-stone-800 shadow-xl border border-stone-200 space-y-5">

      {/* ✝️ LOGO */}
      <img
        src="/images/patterns/aramaic.png"
        className="mx-auto w-12 opacity-80"
        alt="Logo"
      />

      {/* INITIAL */}
      <div className="text-lg tracking-[0.4em] text-stone-700">
        G ✦ A
      </div>

      {/* SCRIPTURE */}
      <p className="text-[11px] italic text-stone-500 leading-relaxed">
        “It is not good for man to be alone. I will make a helper suitable for him.”
        <br />
        <span className="text-[10px] uppercase tracking-widest">
          Genesis 2:18
        </span>
      </p>

      {/* INVITE TEXT */}
      <p className="text-[11px] leading-relaxed text-stone-600">
        We,<br />
        <span className="block mt-1">
          S/o Late N.D. George (Thrissur Municipal Chairman) & Late Mary George
        </span>
        <span className="block">
          Justin George
        </span>
        <span className="block mt-2">
          D/o Late Francis Thaliyath & Late Gracy Francis
        </span>
        <span className="block">
          Niji Justin (Thrissur Corporation Mayor)
        </span>
        <span className="block mt-3">
          cordially request your presence and blessings with family
          on the occasion of the wedding of our son
        </span>
      </p>

      {/* COUPLE */}
      <h1 className="text-3xl font-semibold text-stone-900 leading-tight mt-2">
        George
        <span className="block text-lg text-rose-500 my-1">&</span>
        Ann Mary
      </h1>

      {/* BRIDE DETAILS */}
      <p className="text-[11px] text-stone-600 leading-relaxed px-2">
        D/o Varghese Mangalath <br />
        (S/o Late Mangalath Varkey & Shoshamma) <br />
        & Binu Varghese <br />
        (D/o Avalakottil Paulose & Leelamma)
      </p>

      {/* COUNTDOWN */}
      {timeLeft && (
        <p className="text-[10px] uppercase tracking-widest text-stone-400">
          {timeLeft.days} days to go
        </p>
      )}
      {timeLeft ? (
        <div className="mt-6 flex justify-center gap-4">

          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hrs", value: timeLeft.hours },
            { label: "Min", value: timeLeft.minutes },
            { label: "Sec", value: timeLeft.seconds },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">

              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-rose-200 bg-white shadow-sm">
                <span className="text-sm font-medium text-stone-700">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>

              <span className="text-[9px] mt-1 uppercase tracking-widest text-stone-400">
                {item.label}
              </span>

            </div>
          ))}

        </div>
      ) : (
        <p className="mt-4 text-[10px] uppercase tracking-widest text-rose-500">
          Today is the Day ✨
        </p>
      )}

      {/* CEREMONY */}
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">
          Wedding Ceremony
        </p>
        <p className="text-sm font-medium">
          June 10, 2026 • Wednesday
        </p>
        <p className="text-[12px] text-stone-500">
          3:00 PM
        </p>
        <p className="text-[12px]">
          Lourde Metropolitan Church
        </p>
      </div>

      {/* RECEPTION */}
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-rose-500">
          Reception
        </p>
        <p className="text-[12px]">
          Jeev’s Square Convention Centre
        </p>
        <p className="text-[11px] text-stone-500">
          6:00 PM
        </p>
      </div>

      {/* MAP */}
      {mapLink && (
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs underline text-stone-600"
        >
          📍 View Location
        </a>
      )}

      {/* RSVP */}
      {/* <div className="mt-4 text-[10px] uppercase tracking-widest text-stone-500">
        Kindly RSVP
      </div>

      <p className="text-[11px] text-stone-600 leading-relaxed px-3">
        Please confirm your presence and mention the number of guests
        including yourself
      </p> */}

      {/* FOOTER */}
      <div className="text-[9px] text-stone-300 uppercase tracking-widest pt-2">
        With Love
      </div>

    </div>
  );
}