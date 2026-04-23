export default function ClassicGold({ data }) {
  return (
    <div className="w-[350px] h-[500px] bg-red-900 text-yellow-200 p-6 flex flex-col justify-between font-serif relative">

      {/* Top Border */}
      <div className="text-center text-xs tracking-widest">
        ✨ Wedding Invitation ✨
      </div>

      {/* Couple */}
      <div className="text-center">
        <p className="text-sm mb-2">{data.message}</p>

        <h1 className="text-3xl font-bold mt-4">
          {data.groom}
        </h1>

        <p className="text-lg my-2">&</p>

        <h1 className="text-3xl font-bold">
          {data.bride}
        </h1>
      </div>

      {/* Details */}
      <div className="text-center text-sm space-y-1">
        <p>{data.date}</p>
        <p>{data.time}</p>
        <p>{data.venue}</p>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs opacity-80">
        With blessings of our families
      </div>
    </div>
  );
}