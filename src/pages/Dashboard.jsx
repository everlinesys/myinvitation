import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  UserPlus,
  Users,
  CheckCircle2,
  XCircle,
  Copy,
  ExternalLink,
  Send,
  Search,
  MessageSquare
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: invitationId } = useParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [adding, setAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const API = import.meta.env.VITE_API_BASE_URL;
  const BASE = import.meta.env.VITE_SITE_URL;

  const loadData = () => {
    if (!invitationId) return;
    setLoading(true);
    fetch(`${API}/api/guests/summary/${invitationId}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (invitationId) loadData();
  }, [invitationId]);

  const getGuestLink = (slug) => `${BASE}/g/${slug}`;

  const copyLink = (slug) => {
    navigator.clipboard.writeText(getGuestLink(slug));
    // You could replace this alert with a toast notification
    alert("Invitation link copied to clipboard");
  };

  const shareWhatsApp = (guest) => {
    const link = getGuestLink(guest.slug);

    const text = `
Dear ${guest.name},

With immense joy and heartfelt love, we invite you to be a part of the special day of 💍

✨ *George & Ann Mary* ✨

Your presence would mean the world to us as we begin this beautiful journey together.

📅 *June 10, 2026*
🕒 *3:00 PM*
⛪ Our Lady of Lourdes Metropolitan Cathedral Thrissur

🎉 Reception to follow at 6:00 PM  
📍 Jeev’s Square Convention Centre Pattikkad Thrissur

Kindly view your invitation and let us know your presence:

${link}

We truly hope to celebrate this special moment with you and your family ❤️
`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };
  const handleAddGuest = async () => {
    if (!name.trim()) return alert("Enter guest name");
    try {
      setAdding(true);
      const res = await fetch(`${API}/api/guests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, invitationId }),
      });
      const guest = await res.json();
      setName("");
      setPhone("");
      loadData();
      if (guest?.slug) shareWhatsApp(guest);
    } catch (err) {
      alert("Failed to add guest");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="animate-pulse text-stone-400 tracking-widest uppercase text-sm">Syncing Guestlist...</div>
    </div>
  );

  const guests = data?.guests || [];
  const filteredGuests = guests.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const accepted = guests.filter(g => g.status === "ACCEPTED");
  const declined = guests.filter(g => g.status === "DECLINED");

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif text-stone-900">Guest Management</h1>
            <p className="text-stone-500 text-sm mt-1">Track RSVPs and send personalized invitations.</p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-2 shadow-sm">
            <Search className="w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search guests..."
              className="bg-transparent outline-none text-sm w-40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- SUMMARY CARDS --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Sent" value={data.totalGuests} icon={<Users className="w-4 h-4 text-stone-400" />} />
          <StatCard label="Headcount" value={data.totalAttending} icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />} color="text-emerald-600" />
          <StatCard label="Accepted" value={accepted.length} icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />} />
          <StatCard label="Declined" value={declined.length} icon={<XCircle className="w-4 h-4 text-rose-400" />} />
        </div>

        {/* --- ADD GUEST SECTION --- */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
          <div className="flex items-center gap-2 mb-4 text-stone-800 font-medium">
            <UserPlus className="w-4 h-4" />
            <h3>Add New Guest</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="bg-stone-50 border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-stone-900 p-3 rounded-xl text-sm transition-all"
              placeholder="Guest Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="bg-stone-50 border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-stone-900 p-3 rounded-xl text-sm transition-all"
              placeholder="WhatsApp Number (Optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={handleAddGuest}
              disabled={adding}
              className="bg-stone-900 hover:bg-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{adding ? "Creating..." : "Add & Send"}</span>
            </button>
          </div>
        </div>

        {/* --- TABLE --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50/50 border-b border-stone-100 text-[11px] uppercase tracking-widest text-stone-400">
                <th className="px-6 py-4 font-semibold">Guest</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Party Size</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredGuests.map((g) => (
                <tr key={g.id} className="hover:bg-stone-50/40 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-medium text-stone-800">{g.name}</p>
                    <p className="text-[10px] text-stone-400">{g.phone || "No phone added"}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={g.status} />
                  </td>
                  <td className="px-6 py-4 text-center flex">
                    <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded-md text-xs font-medium">
                      {g.attendees || 0}
                    </span>
                    <button onClick={() => shareWhatsApp(g)} className="p-2 md:hidden text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all" title="Send WhatsApp">
                      <FaWhatsapp className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => copyLink(g.slug)} className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all" title="Copy Link">
                        <Copy className="w-4 h-4" />
                      </button>
                      <a href={`/g/${g.slug}`} target="_blank" rel="noreferrer" className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all" title="Preview">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button onClick={() => shareWhatsApp(g)} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all" title="Send WhatsApp">
                        <FaWhatsapp className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredGuests.length === 0 && (
            <div className="py-20 text-center text-stone-400 italic text-sm">
              No guests found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function StatCard({ label, value, icon, color = "text-stone-900" }) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">{label}</span>
        {icon}
      </div>
      <h2 className={`text-2xl font-semibold ${color}`}>{value}</h2>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    ACCEPTED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    DECLINED: "bg-rose-50 text-rose-700 border-rose-100",
    PENDING: "bg-stone-100 text-stone-500 border-stone-200",
  };

  const currentStyle = styles[status] || styles.PENDING;

  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${currentStyle}`}>
      {status || "PENDING"}
    </span>
  );
}