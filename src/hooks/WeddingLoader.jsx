export default function WeddingLoader() {
  return (
    <div className="fixed inset-0 bg-[#FDFBF8] flex items-center justify-center z-[999] overflow-hidden">

      {/* 🌸 Soft background glow */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-rose-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-stone-100 rounded-full blur-3xl opacity-40" />

      <div className="relative flex flex-col items-center gap-6">

        {/* ✝️ Logo */}
        <img
          src="/images/patterns/aramaic.png"
          alt="logo"
          className="w-12 opacity-70 animate-fade"
        />

        {/* 💍 Initials */}
        <div className="text-lg tracking-[0.5em] text-stone-600 animate-soft-pulse">
          G ✦ A
        </div>

        {/* ✨ Loading text */}
        <p className="text-[11px] text-stone-400 tracking-widest uppercase animate-fade">
          Unveiling...
        </p>

        {/* 🌿 Minimal loader line */}
        <div className="w-24 h-[1px] bg-stone-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-10 bg-rose-300 animate-slide" />
        </div>

      </div>
    </div>
  );
}