import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { templates } from "../templates";
import WeddingLoader from "../hooks/WeddingLoader";
import confetti from "canvas-confetti";
import { Helmet } from "react-helmet-async";

export default function GuestInvite() {
  const { slug } = useParams();
  const audioRef = useRef(null);

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const [attendees, setAttendees] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [showMusicPopup, setShowMusicPopup] = useState(false);
  const [index, setIndex] = useState(0);

  const API = import.meta.env.VITE_API_BASE_URL;

  // 🔒 lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // 🎵 autoplay logic
  useEffect(() => {
    if (ready && audioRef.current) {
      audioRef.current.play()
        .then(() => setShowMusicPopup(false))
        .catch(() => setShowMusicPopup(true));
    }
  }, [ready]);

  // 📦 fetch guest
  useEffect(() => {
    let timer;

    fetch(`${API}/api/guests/${slug}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setStatus(res.status || "PENDING");
        setAttendees(res.attendees || 1);

        timer = setTimeout(() => {
          setLoading(false);
          setReady(true);
        }, 2000);
      })
      .catch(() => setLoading(false));

    return () => clearTimeout(timer);
  }, [slug, API]);

  // 🎉 RSVP
  const submitRSVP = async (newStatus) => {
    try {
      await fetch(`${API}/api/guests/${slug}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          attendees: newStatus === "DECLINED" ? 0 : attendees,
        }),
      });

      setStatus(newStatus);
      setSubmitted(true);

      if (newStatus === "ACCEPTED") {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#fbcfe8", "#fde68a", "#e7e5e4"],
        });
      }
    } catch {
      alert("RSVP failed");
    }
  };

  // 🖼️ slider images
  const images = [
    "/images/georgemary.jpeg",
    "/images/georgemary2.jpeg",
    "/images/georgemary3.jpeg",
  ];

  // 🎞️ slider autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !ready) return <WeddingLoader />;

  if (!data) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        Failed to load
      </div>
    );
  }

  const TemplateComponent =
    templates[data?.template] ?? templates.floralWhite;

  return (
    <div className="z-[99] fixed inset-0 overflow-y-auto flex flex-col items-center py-10 px-4 bg-[#FDFBF8]">

      {/* SEO */}
      <Helmet>
        <title>{data?.groom} & {data?.bride} Wedding Invitation</title>
      </Helmet>

      {/* 🌸 Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-rose-100 rounded-full blur-xl opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-stone-100 rounded-full blur-xl opacity-80" />
      </div>

      {/* 💌 Guest */}
      <div className="mb-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400">
          Exclusive Invitation For
        </p>

        <h2 className="text-3xl font-serif italic text-stone-800 mt-2 animate-floatSoft">
          {data.guestName?.toUpperCase() || "Guest"}
        </h2>
      </div>

      {/* 🖼️ SLIDER */}
      <div className="w-full max-w-sm mb-6 relative z-10">
        <div className="w-full h-48 relative overflow-hidden rounded-2xl shadow-md">

          {images.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100 z-20" : "opacity-0 z-10"
                }`}
            >
              <img src={img} className="w-full h-full object-cover" />
            </div>
          ))}

        </div>
      </div>

      {/* 🎨 CARD */}
      <div className="w-full flex justify-center">
        <div className="shadow-2xl rounded-2xl overflow-hidden">
          <TemplateComponent data={data} />
        </div>
      </div>

      {/* 💬 RSVP */}
      <div className="mt-[14px] w-full max-w-sm z-20">

        <div className="bg-white border border-stone-100 p-6 rounded-[2rem] shadow-xl">

          {!submitted ? (
            <div className="space-y-6 text-center">

              <h3 className="font-serif text-lg text-stone-800">
                Would you be able to join us?
              </h3>

              {/* YES / NO ALWAYS VISIBLE */}
              <div className="flex gap-3">

                <button
                  onClick={() => setStatus("ACCEPTED")}
                  className="flex-1 py-3 rounded-full bg-stone-900 text-white text-sm hover:bg-emerald-600 transition"
                >
                  Yes, I will
                </button>

                <button
                  onClick={() => submitRSVP("DECLINED")}
                  className="flex-1 py-3 rounded-full border text-sm text-stone-500 hover:text-rose-500 hover:border-rose-200 transition"
                >
                  No, I can’t make it
                </button>

              </div>

              {/* GUEST SELECT (ONLY AFTER YES) */}
              {status === "ACCEPTED" && (
                <div className="space-y-5 mt-4">

                  <p className="text-xs text-stone-400 uppercase tracking-widest">
                    Number of guests including yourself
                  </p>

                  <div className="flex justify-center items-center gap-4">

                    <button
                      onClick={() => setAttendees(Math.max(1, attendees - 1))}
                      className="w-10 h-10 border rounded-full"
                    >
                      –
                    </button>

                    <span className="text-xl font-medium w-8 text-center">
                      {attendees}
                    </span>

                    <button
                      onClick={() => setAttendees(attendees + 1)}
                      className="w-10 h-10 border rounded-full"
                    >
                      +
                    </button>

                  </div>

                  <button
                    onClick={() => submitRSVP("ACCEPTED")}
                    className="w-full py-3 rounded-full bg-emerald-600 text-white text-sm hover:bg-emerald-700"
                  >
                    Confirm
                  </button>

                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-6">

              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                ❤️
              </div>

              <h3 className="font-serif text-xl text-stone-800">
                {status === "ACCEPTED"
                  ? "We’re excited to celebrate with you!"
                  : "Thank you for letting us know"}
              </h3>

              <p className="text-sm text-stone-500 mt-2">
                {status === "ACCEPTED"
                  ? `${attendees} guest${attendees > 1 ? "s" : ""} confirmed`
                  : "We’ll miss you"}
              </p>

            </div>
          )}

        </div>
      </div>

      {/* 💖 Best Regards */}
      <div className="mt-10 text-center items-center flex flex-col gap-4">
        <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400">
          Best Regards From
        </p>

        <h3 className="text-xl font-serif italic text-stone-800 mt-2">
          Fr.Francis Neelankavil,<br />
          Mary Ann Justin and <br />
          Ceramet Dental Factory <br /><span className="texl-sm text-stone-600">since 1994</span>
        </h3>
        <img src="/images/ceramet.png" alt="" className="h-20 w-auto" />
      </div>

      {/* Footer */}
      <p className="mt-10 text-[9px] text-stone-300 uppercase tracking-[0.4em]">
        MyInvite
      </p>

      {/* 🎵 audio */}
      <audio ref={audioRef} loop>
        <source src="/music/wedding.mp3" type="audio/mpeg" />
      </audio>

      {/* 💎 POPUP */}
      {/* 💎 MODERN ENTRY POPUP */}
      {showMusicPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden">
          {/* Immersive Frosted Glass Backdrop */}
          <div className="absolute inset-0 bg-[#FDFBF8]/80 backdrop-blur-[20px]" />

          {/* Floating Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-rose-100 rounded-full blur-3xl opacity-60 animate-pulse" />
            <div className="absolute bottom-[20%] right-[10%] w-40 h-40 bg-stone-200 rounded-full blur-3xl opacity-50 animate-pulse" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-xs w-full px-6">
            <style>{`
              @keyframes slowFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              .animate-float-slow {
                animation: slowFloat 4s ease-in-out infinite;
              }
              .shimmer-btn {
                background: linear-gradient(110deg, #1c1917 45%, #44403c 50%, #1c1917 55%);
                background-size: 200% 100%;
                animation: shimmer 3s infinite linear;
              }
              @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `}</style>

            {/* Icon/Logo area */}
            <div className="mb-8 animate-float-slow">
              <div className="relative">
                <div className="absolute inset-0 bg-rose-200 blur-2xl opacity-30 rounded-full scale-150" />
                <img
                  src="/images/patterns/aramaic.png"
                  alt="Logo"
                  className="w-12 h-auto relative z-10 opacity-60 grayscale hover:grayscale-0 transition-all"
                />
              </div>
            </div>

            <div className="text-center space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 block">
                Welcome to the Wedding of
              </span>

              <h1 className="font-serif text-3xl text-stone-800 leading-tight">
                George <span className="text-rose-300 font-sans italic text-2xl">&</span> Ann Mary
              </h1>

            

             
            </div>

            <button
              onClick={() => {
                audioRef.current?.play();
                setShowMusicPopup(false);
              }}
              className="shimmer-btn mt-10 w-full py-4 rounded-full text-white text-[12px] uppercase tracking-[0.3em] shadow-xl shadow-stone-200 active:scale-95 transition-transform"
            >
             View Invitation
            </button>

            <p className="mt-6 text-[9px] text-stone-300 tracking-widest uppercase">
              Exclusive Invitation
            </p>
          </div>
        </div>
      )}

    </div>
  );
}