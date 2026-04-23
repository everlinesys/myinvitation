export default function ElegantGreen({ data }) {
  return (
    <div className="w-[350px] h-[500px] bg-green-900 text-yellow-100 p-6 flex flex-col justify-between font-serif">

      <div className="text-center text-xs tracking-widest">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيم
      </div>

      <div className="text-center">
        <p className="text-sm mb-2">{data.message}</p>

        <h1 className="text-2xl font-semibold mt-4">
          {data.groom}
        </h1>

        <p className="my-2">&</p>

        <h1 className="text-2xl font-semibold">
          {data.bride}
        </h1>
      </div>

      <div className="text-center text-sm space-y-1">
        <p>{data.date}</p>
        <p>{data.time}</p>
        <p>{data.venue}</p>
      </div>

      <div className="text-center text-xs opacity-80">
        Nikah Ceremony
      </div>
    </div>
  );
}