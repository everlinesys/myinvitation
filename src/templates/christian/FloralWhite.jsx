export default function FloralWhite({ data }) {
  return (
    <div className="w-[350px] h-[500px] bg-white text-gray-800 p-6 flex flex-col justify-between border font-serif">

      <div className="text-center text-sm tracking-wide">
        Wedding Invitation
      </div>

      <div className="text-center">
        <p className="text-sm italic">{data.message}</p>

        <h1 className="text-2xl font-semibold mt-6">
          {data.groom} & {data.bride}
        </h1>
      </div>

      <div className="text-center text-sm space-y-1">
        <p>{data.date}</p>
        <p>{data.time}</p>
        <p>{data.venue}</p>
      </div>

      <div className="text-center text-xs text-gray-500">
        Reception to follow
      </div>
    </div>
  );
}