import { useEffect, useState } from "react";
import { FaLocationArrow, FaMapMarked, FaMapPin } from "react-icons/fa";
import {
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
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
    <div className="w-full w-[460px] max-w-[90vw] bg-[#FCFAF7] p-8 text-center  text-stone-800 shadow-xl border border-stone-200 space-y-6 leading-relaxed">

      {/* ✝️ LOGO */}
      <img
        src="/images/patterns/aramaic.png"
        className="mx-auto w-14 opacity-80"
        alt="Logo"
      />

      {/* INITIAL */}
      <div className="text-base tracking-[0.35em] text-stone-700">
        G ✦ A
      </div>

      {/* SCRIPTURE */}
      <p className="text-sm italic text-stone-500 leading-relaxed px-2">
        “Have you not read that the one who made them at the beginning ‘made them male and female,’ and said, ‘For this reason a man shall leave his father and mother and be joined to his wife, and the two shall become one flesh’? So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate."<br />
        <span className="text-xs uppercase tracking-widest text-stone-400">
          Matthew 19: 4-6
        </span>
      </p>

      {/* INVITE TEXT */}
      <p className="text-sm leading-relaxed text-stone-600 px-2">
        We,<br />
        <span className="block font-medium">
          Justin George
        </span>
        <span className="block mt-1 text-xs text-stone-500 leading-relaxed">
          (S/o Late N.D. George (Former Chairman , Municipal Council, Thrissur) & Late Mary George)
        </span> &
        <span className="block font-medium mt-2">
          Niji Justin <br /> Mayor, Municipal Corporation, Thrissur 
        </span>
        <span className="block mt-1 text-xs text-stone-500 leading-relaxed">
          (D/o Late Francis Thaliyath & Late Gracy Francis)
        </span>

        <span className="block mt-4">
          cordially request your presence and blessings with family
          on the occasion of the wedding of our son
        </span>
      </p>

      {/* COUPLE */}
      <h1 className="text-4xl font-semibold text-stone-900 leading-tight mt-2 fancy-font">
        George
        <span className="block text-lg text-rose-500 my-2">with</span>
        Ann Mary
      </h1>

      {/* BRIDE DETAILS */}
      <p className="text-sm text-stone-600 leading-relaxed px-3">
        Beloved D/o Varghese Mangalath <br />
        (S/o Late Mangalath Varkey & Shoshamma) <br />
        & Binu Varghese <br />
        (D/o Avalakottil Paulose & Leelamma)
      </p>

      {/* COUNTDOWN */}
      {timeLeft && (
        <p className="text-xs uppercase tracking-widest text-stone-400">
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
                <span className="text-base font-medium text-stone-700">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>

              <span className="text-[10px] mt-1 uppercase tracking-widest text-stone-400">
                {item.label}
              </span>

            </div>
          ))}

        </div>
      ) : (
        <p className="mt-4 text-xs uppercase tracking-widest text-rose-500">
          Today is the Day ✨
        </p>
      )}

      {/* CEREMONY */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-stone-400">
          Wedding Ceremony
        </p>

        <p className="text-base font-medium">
          June 10, 2026 • Wednesday
        </p>

        <p className="text-sm text-stone-500">
          3:00 PM
        </p>

        <a
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm underline text-stone-700"
          href="https://maps.app.goo.gl/MEHkQgA92yJ2cACz6"
        >
          <p className="flex gap-2 justify-center">
            <MapPin height={18} className="text-rose-500" />
            Our Lady of Lourdes Metropolitan Cathedral Thrissur
          </p>
        </a>
      </div>

      {/* RECEPTION */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-rose-500">
          Reception
        </p>

        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm underline text-stone-700"
        >
          <p className="flex gap-2 justify-center">
            <MapPin height={18} className="text-rose-500" />
            Jeev’s Square Convention Centre Pattikkad Thrissur
          </p>
        </a>

        <p className="text-sm text-stone-500">
          6:00 PM
        </p>
      </div>

      {/* FOOTER */}
      <div className="text-[10px] text-stone-300 uppercase tracking-widest pt-2">
        With Love
      </div>

    </div>
  );
}