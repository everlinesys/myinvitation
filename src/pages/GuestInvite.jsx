import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { templates } from "../templates";
import WeddingLoader from "../hooks/WeddingLoader";
import confetti from "canvas-confetti";
import { Helmet } from "react-helmet-async";
import html2pdf from "html2pdf.js";
import WeddingPdfCard from "../hooks/WeddingpdfCard";
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
  const [entered, setEntered] = useState(false);
  const API = import.meta.env.VITE_API_BASE_URL;
  // 🧹 clear stale cache (fix blank screen on revisit)
  useEffect(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.log("Storage clear failed");
    }
  }, []);
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
        // 🔒 AUTO LOCK IF ALREADY RESPONDED
        if (res.status && res.status !== "PENDING") {
          setSubmitted(true);
        }
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
  const pdfRef = useRef();
  // 🎞️ slider autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!entered) {
    return (
      <WeddingLoader
        onEnter={() => {
          setEntered(true);

          setTimeout(() => {
            const audio = audioRef.current;
            if (!audio) return;

            audio.volume = 0;
            audio.play().catch(() => { });

            let vol = 0;
            const fade = setInterval(() => {
              if (vol >= 0.3) {
                clearInterval(fade);
                return;
              }
              vol += 0.03;
              audio.volume = vol;
            }, 120);
          }, 100);
        }}
      />
    );
  }



  const download = () => {
    const el = document.getElementById("invite-pdf");

    html2pdf().from(el).set({
      filename: "Wedding.pdf",
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "px", format: [500, 700] },
    }).save();
  };
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
      <div ref={pdfRef} className="hidden">
        <WeddingPdfCard guestName={data.guestName} />
      </div>   <style>{`
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .shimmer-btn {
    background: linear-gradient(
      110deg,
      #1c1917 45%,
      #44403c 50%,
      #1c1917 55%
    );
    background-size: 200% 100%;
    animation: shimmer 3s infinite linear;
  } .shimmer-text {
    background: linear-gradient(
      110deg,
      #4b4b4b 40%,
      #d6d3d1 50%,
      #363636 60%
    );
    background-size: 200% auto;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    animation: shimmerText 5s linear infinite;
  } @keyframes shimmerText {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
  }

`}</style>




      {/* SEO */}
      <Helmet>
        <title>{data?.groom} & {data?.bride} Wedding Invitation</title>
      </Helmet>

      {/* 🌸 Background */}
      {/* 🖼️ FULL BACKGROUND IMAGE */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/images/georgemary2.jpeg"
          alt="background"
          className="w-full h-full object-cover"
        />

        {/* soft overlay for readability */}
        <div className="absolute inset-0 bg-[#FDFBF8]/10" />
      </div>

      {/* 💌 Guest */}
      <div className="mb-8 text-center">
        <p className="text-[15px] uppercase tracking-[0.4em] text-stone-700">
          Exclusive Invitation For
        </p>

        <h2 className="text-3xl font-serif italic mt-2 shimmer-text tracking-wide">
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

        <div className="bg-white border border-stone-100 rounded-[2rem] shadow-xl overflow-hidden">

          {/* 🖼️ TOP IMAGE */}
          <div className="w-full h-40 overflow-hidden">
            <img
              src="/images/georgemary.jpeg"
              alt="couple"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="p-6">

            {!submitted ? (
              <div className="space-y-6 text-center">

                <h3 className="font-serif text-lg text-stone-800">
                  Dear {data.guestName || "Guest"}, Would you be able to join us?
                </h3>

                {/* YES / NO */}
                <div className="flex gap-3">

                  <button
                    onClick={() => setStatus("ACCEPTED")}
                    className="flex-1 py-3 rounded-full text-white text-sm shimmer-btn shadow-xl active:scale-95 transition-all duration-300"
                  >
                    Yes, I will
                  </button>
                  <button
                    onClick={() => submitRSVP("DECLINED")}
                    className="flex-1 py-3 rounded-full border text-sm text-stone-600 hover:text-rose-500 hover:border-rose-200 transition"
                  >
                    Sorry, I can’t make it
                  </button>

                </div>

                {/* GUEST SELECT */}
                {status === "ACCEPTED" && (
                  <div className="space-y-5 mt-4">

                    <p className="text-xs text-stone-500 uppercase tracking-widest">
                      Number of guests including yourself
                    </p>

                    <div className="flex justify-center items-center gap-4">

                      <button
                        onClick={() => setAttendees(Math.max(1, attendees - 1))}
                        className="w-10 h-10 border rounded-full"
                      >
                        –
                      </button>

                      <span className="text-xl font-medium w-8 text-center text-stone-800">
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
                      className="w-full py-3 rounded-full bg-emerald-600 text-white text-sm hover:bg-emerald-700 animate-pulseScale"
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
                {status === "ACCEPTED" && (
                  <button
                    onClick={download}
                    className="mt-4 px-6 py-2 rounded-full bg-stone-900 text-white text-sm hover:bg-black transition"
                  >
                    Download Invitation PDF
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 💖 Best Regards */}
      <div className="mt-10 text-center items-center flex flex-col gap-4">
        <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400">
          Best Regards From
        </p>

        <h3 className="text-xl font-serif italic text-stone-800 mt-2">
          Fr.Francis Neelankavil,<br />
          Mary Ann Justin & <br />
          Ceramet Dental Factory
        </h3>
        <img src="/images/ceramet.png" alt="" className="h-40 w-auto" />
      </div>

      {/* Footer */}
      <a href="/" className="mt-10 text-[9px] text-stone-300 uppercase tracking-[0.4em]">
        MyInvite
      </a>

      {/* 🎵 audio */}
      <audio ref={audioRef} loop>
        <source src="/music/wedding4.mp3" type="audio/mpeg" />
      </audio>

      {/* 💎 POPUP */}
      {/* 💎 MODERN ENTRY POPUP */}


    </div >
  );
}