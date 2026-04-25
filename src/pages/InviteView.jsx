import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { templates } from "../templates";
import { buildWhatsAppMessage, shareWhatsApp } from "../utils/share";
export default function InviteView() {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`https://premiumweddingcards.trato.in/api/invites/${slug}`)
            .then((res) => {
                if (!res.ok) throw new Error("Invite not found");
                return res.json();
            })
            .then(setData)
            .catch((err) => {
                console.error(err);
                setError(true);
            });
    }, [slug]);

    if (error) {
        return (
            <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-serif text-stone-800">Invitation not found</h2>
                    <p className="text-stone-500">Please check the link and try again.</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="fixed inset-0 z-[100] bg-[#FDFCFB] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-stone-200 border-t-rose-400 rounded-full animate-spin" />
                    <p className="text-stone-400 font-serif italic tracking-widest">Unveiling...</p>
                </div>
            </div>
        );
    }

    const TemplateComponent = templates[data.template] || templates["floralWhite"];

    return (
        /* 🔥 FIXED INSET-0 Z-[100]: 
          This ensures the invite sits on top of everything (Header, Footer, etc.) 
          and fills the entire browser window.
        */
        <div className="fixed inset-0 z-[100] bg-[#FDFCFB] overflow-y-auto flex justify-center py-10 md:py-20">

            {/* Decorative background flair to make the full-screen look premium */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-100/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-100/50 to-transparent" />
            </div>

            <div className="relative z-10 animate-in fade-in zoom-in duration-1000">
                {/* Render the specific template */}
                <TemplateComponent data={data} />
                <div className="mt-6 flex flex-col items-center gap-3">

                    <button
                        onClick={() => {
                            const message = buildWhatsAppMessage({
                                groom: data.groom,
                                bride: data.bride,
                                date: data.date,
                                venue: data.venue,
                                link: window.location.href,
                            });

                            shareWhatsApp(message);
                        }}
                        className="bg-green-500 text-white px-6 py-2 rounded-full text-sm hover:bg-green-600 transition"
                    >
                        Share on WhatsApp
                    </button>

                </div>
                {/* Subtle branding footer since header is hidden */}
                <p className="mt-12 text-center text-[10px] tracking-[0.3em] text-stone-400 uppercase pb-10">
                    Created with myInvite Studio
                </p>
            </div>
        </div>
    );
}