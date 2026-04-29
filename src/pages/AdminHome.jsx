import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus, LayoutDashboard, ExternalLink, Calendar, MapPin } from "lucide-react";

export default function AdminHome() {
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`${API}/api/invites/mine`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch");
                setInvites(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setInvites([]);
                setLoading(false);
            });
    }, [API, token]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-stone-200 border-t-stone-800 animate-spin" />
                    <p className="text-stone-400 text-sm tracking-widest uppercase">Loading Collection</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-stone-900 pb-20">
            {/* --- HEADER --- */}
            <header className="sticky top-0 z-10 bg-[#FDFCFB]/80 backdrop-blur-md border-b border-stone-100">
                <div className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-end">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-1">Management Suite</p>
                        <h1 className="text-3xl font-serif">Your Invitations</h1>
                    </div>
                    {/* <Link
                        to="/editor"
                        className="flex items-center gap-2 bg-stone-900 text-stone-50 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create New</span>
                    </Link> */}
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 mt-12">
                {invites.length === 0 ? (
                    <div className="text-center py-24 border-2 border-dashed border-stone-100 rounded-[2rem]">
                        <p className="text-stone-400 font-serif italic text-lg">Your collection is empty.</p>
                        <Link to="/editor" className="text-rose-500 text-sm underline mt-2 inline-block">Start your first design</Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-1">
                        {invites.map((inv) => (
                            <div
                                key={inv.id}
                                className="group bg-white p-6 rounded-[1.5rem] border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                            >
                                {/* INFO SECTION */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-xl font-serif text-stone-800">
                                            {inv.groom} <span className="text-stone-300 font-sans mx-1">&</span> {inv.bride}
                                        </h2>
                                        <span className="text-[9px] bg-stone-50 text-stone-500 px-2 py-0.5 rounded border border-stone-100 uppercase tracking-tighter">
                                            Live
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-4 text-stone-500">
                                        <div className="flex items-center gap-1.5 text-xs">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {inv.date || "Date not set"}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="truncate max-w-[200px]">{inv.venue || "Venue not set"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* ACTIONS SECTION */}
                                <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
                                    <button
                                        onClick={() => navigate(`/dashboard/${inv.id}`)}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 text-sm px-6 py-2.5 bg-stone-900 text-white rounded-full hover:bg-black transition-colors"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Manage
                                    </button>

                                    <a
                                        href={`/invite/${inv.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 text-sm px-6 py-2.5 border border-stone-200 rounded-full hover:bg-stone-50 transition-colors text-stone-600"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}