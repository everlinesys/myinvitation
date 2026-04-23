export default function FormPanel({ data, setData }) {
  const update = (field, value) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-6">

      {/* 👤 Couple Details */}
      <section>
        <h3 className="font-semibold mb-3 text-sm text-gray-700">
          Couple Details
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <input
            className="input"
            placeholder="Groom Name"
            value={data.groom}
            onChange={(e) => update("groom", e.target.value)}
          />
          <input
            className="input"
            placeholder="Bride Name"
            value={data.bride}
            onChange={(e) => update("bride", e.target.value)}
          />
        </div>
      </section>

      {/* 👪 Parents */}
      <section>
        <h3 className="font-semibold mb-3 text-sm text-gray-700">
          Parents (Optional)
        </h3>

        <input
          className="input mb-2"
          placeholder="Groom's Parents"
          value={data.groomParents || ""}
          onChange={(e) => update("groomParents", e.target.value)}
        />

        <input
          className="input"
          placeholder="Bride's Parents"
          value={data.brideParents || ""}
          onChange={(e) => update("brideParents", e.target.value)}
        />
      </section>

      {/* 📅 Event Details */}
      <section>
        <h3 className="font-semibold mb-3 text-sm text-gray-700">
          Event Details
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <input
            className="input"
            placeholder="Date"
            value={data.date}
            onChange={(e) => update("date", e.target.value)}
          />
          <input
            className="input"
            placeholder="Time"
            value={data.time}
            onChange={(e) => update("time", e.target.value)}
          />
        </div>

        <input
          className="input mt-2"
          placeholder="Venue"
          value={data.venue}
          onChange={(e) => update("venue", e.target.value)}
        />
      </section>

      {/* ✍️ Message */}
      <section>
        <h3 className="font-semibold mb-3 text-sm text-gray-700">
          Invitation Message
        </h3>

        <textarea
          className="input h-24"
          placeholder="Write your message..."
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </section>

    </div>
  );
}