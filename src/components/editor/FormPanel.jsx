export default function FormPanel({ data, setData }) {
  const update = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Modern input shared style
  const inputStyle = "w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-400 focus:bg-white placeholder:text-stone-300";
  const getMapsLink = (address) => {
    if (!address) return "";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };
  return (
    <div className="space-y-10">

      {/* 👤 Couple Details */}
      <section className="animate-in fade-in slide-in-from-left-2 duration-500">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">💍</span>
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">
            Couple Details
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-stone-500 ml-1 uppercase">Groom</label>
            <input
              className={inputStyle}
              placeholder="Full Name"
              value={data.groom}
              onChange={(e) => update("groom", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-stone-500 ml-1 uppercase">Bride</label>
            <input
              className={inputStyle}
              placeholder="Full Name"
              value={data.bride}
              onChange={(e) => update("bride", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* 👪 Parents */}
      <section className="animate-in fade-in slide-in-from-left-2 duration-700">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">👪</span>
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">
            Family Recognition <span className="lowercase font-normal opacity-60">(Optional)</span>
          </h3>
        </div>

        <div className="space-y-4">
          <input
            className={inputStyle}
            placeholder="Groom's Parents (e.g., Mr. & Mrs. Smith)"
            value={data.groomParents || ""}
            onChange={(e) => update("groomParents", e.target.value)}
          />
          <input
            className={inputStyle}
            placeholder="Bride's Parents (e.g., Mr. & Mrs. Doe)"
            value={data.brideParents || ""}
            onChange={(e) => update("brideParents", e.target.value)}
          />
        </div>
      </section>

      {/* 📅 Event Details */}
      <section className="animate-in fade-in slide-in-from-left-2 duration-1000">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📍</span>
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">
            When & Where
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            className={inputStyle}
            placeholder="Wedding Date"
            value={data.date}
            onChange={(e) => update("date", e.target.value)}
          />
          <input
            className={inputStyle}
            placeholder="Start Time"
            value={data.time}
            onChange={(e) => update("time", e.target.value)}
          />
        </div>

        <input
          className={`${inputStyle} mt-4`}
          placeholder="Venue Address & City"
          value={data.venue}
          onChange={(e) => {
            const venue = e.target.value;

            setData((prev) => ({
              ...prev,
              venue,
              mapLink: venue
                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`
                : "",
            }));
          }}
        />
      </section>

      {/* ✍️ Message */}
      <section className="animate-in fade-in slide-in-from-left-2 duration-1000">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">✉️</span>
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">
            Personal Invitation Message
          </h3>
        </div>

        <textarea
          className={`${inputStyle} h-32 resize-none leading-relaxed`}
          placeholder="Join us as we celebrate our love and the start of our new life together..."
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </section>

    </div>
  );
}