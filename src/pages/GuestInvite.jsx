import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { templates } from "../templates";
import WeddingLoader from "../hooks/WeddingLoader";
import confetti from "canvas-confetti";
import { Helmet } from "react-helmet-async";



export default function GuestInvite() {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const [attendees, setAttendees] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_BASE_URL;

  // 🔥 lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // 🔥 fetch guest
  useEffect(() => {
    fetch(`${API}/api/guests/${slug}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setStatus(res.status || "PENDING");
        setAttendees(res.attendees || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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

  if (loading) return <WeddingLoader />;

  if (!data) {
    return (
      <div className="fixed inset-0 z-[99] flex items-center justify-center bg-white">
        Failed to load
      </div>
    );
  }

  const TemplateComponent =
    templates[data?.template] ?? templates.floralWhite;

  return (
    <div className="fixed inset-0 z-[99] overflow-y-auto flex flex-col items-center py-10 px-4 bg-[#FDFBF8]">
      <Helmet>
        <title>
          {data?.groom} & {data?.bride} Wedding Invitation
        </title>

        <meta
          property="og:title"
          content={`${data?.groom} & ${data?.bride} Wedding`}
        />

        <meta
          property="og:description"
          content={`You are invited to celebrate the wedding of ${data?.groom} & ${data?.bride} 💍`}
        />

        <meta
          property="og:image"
          content={`${import.meta.env.VITE_SITE_URL}/images/patterns/aramaic.png`}
        />

        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      {/* 🌸 SOFT WEDDING BACKGROUND */}
      <div className="fixed inset-0 -z-10 pointer-events-none">

        {/* glow blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-rose-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-stone-100 rounded-full blur-3xl opacity-40" />

        {/* subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/patterns/aramaic.png')] bg-center bg-repeat" />

      </div>

      {/* 💌 Greeting */}
      <div className="mb-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400">
          Exclusive Invitation For
        </p>
        <h2 className="text-3xl font-serif italic text-stone-800 mt-2">
          {data.guestName?.toUpperCase() || "Guest"}
        </h2>
      </div>

      {/* 🎨 Card */}
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
                    Number of guests
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

      {/* Footer */}
      <p className="mt-10 text-[9px] text-stone-300 uppercase tracking-[0.4em]">
        MyInvite
      </p>

    </div>
  );
}