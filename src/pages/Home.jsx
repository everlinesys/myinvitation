import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900 selection:bg-rose-100">
      <div className="flex flex-col items-center text-center gap-24 py-20 px-6 max-w-7xl mx-auto">
        
        {/* 🔥 HERO */}
        <section className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="inline-block py-1 px-3 mb-6 text-xs font-semibold tracking-widest uppercase bg-rose-50 text-rose-600 rounded-full">
            Elegance Simplified
          </span>
          <h1 className="text-4xl md:text-7xl font-serif font-light leading-tight tracking-tight">
            Create & Send <br /> 
            <span className="italic font-normal">Beautiful</span> Wedding Invitations
          </h1>

          <p className="mt-8 text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Design your invitation in minutes. Share instantly or send 
            personalized invites with integrated RSVP tracking.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5 items-center">
            <Link
              to="/editor"
              className="group relative bg-rose-600 text-white px-8 py-4 rounded-full shadow-xl shadow-rose-200 hover:bg-rose-700 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="relative z-10 font-medium">Start Creating (Free)</span>
            </Link>

            <a
              href="#how"
              className="px-8 py-4 rounded-full border border-gray-200 text-gray-600 hover:bg-white hover:border-gray-400 transition-all"
            >
              How it Works
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-6 tracking-wide">
            — No signup required to start —
          </p>
        </section>

        {/* ⚡ HOW IT WORKS */}
        <section id="how" className="w-full grid md:grid-cols-3 gap-12 text-left">
          {[
            { step: "01", title: "Design Freely", desc: "Create your invitation without login. Live preview included." },
            { step: "02", title: "Save & Send", desc: "Login only when you're ready to save or share with the world." },
            { step: "03", title: "Manage Guests", desc: "Send personal invites and track RSVPs with a real-time dashboard." }
          ].map((item, idx) => (
            <div key={idx} className="group p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500">
              <span className="text-rose-200 font-serif text-4xl block mb-4 group-hover:text-rose-400 transition-colors">{item.step}</span>
              <h3 className="text-xl font-medium mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* 🎨 TEMPLATE PREVIEW */}
        <section id="templates" className="w-full">
          <div className="flex items-end justify-between mb-10 text-left">
            <div>
              <h2 className="text-3xl font-serif mb-2">Choose Your Style</h2>
              <p className="text-gray-500">Hand-crafted layouts for every tradition.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "Hindu Classic", color: "bg-red-900" },
              { name: "Christian Floral", color: "bg-stone-50 border border-gray-100" },
              { name: "Muslim Elegant", color: "bg-emerald-900" }
            ].map((tpl, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className={`h-[400px] ${tpl.color} rounded-2xl mb-4 overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500`} />
                <p className="text-lg font-light tracking-wide">{tpl.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 💡 VALUE PROPS */}
        <section className="w-full bg-stone-900 text-stone-100 rounded-[3rem] p-12 md:p-20 grid md:grid-cols-3 gap-12 text-left">
          <div>
            <div className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center mb-6 text-rose-400">⚡</div>
            <h3 className="text-xl font-medium mb-3">Instant Preview</h3>
            <p className="text-stone-400 font-light leading-relaxed">
              Watch your dream card come to life in real-time as you edit details.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center mb-6 text-rose-400">👥</div>
            <h3 className="text-xl font-medium mb-3">Guest RSVP</h3>
            <p className="text-stone-400 font-light leading-relaxed">
              Automated tracking. Know exactly who is coming and their preferences.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center mb-6 text-rose-400">📱</div>
            <h3 className="text-xl font-medium mb-3">WhatsApp Ready</h3>
            <p className="text-stone-400 font-light leading-relaxed">
              Share beautiful, mobile-optimized links directly through messaging apps.
            </p>
          </div>
        </section>

        {/* 🚀 FINAL CTA */}
        <section className="py-10">
          <Link
            to="/editor"
            className="inline-block bg-stone-900 text-white px-12 py-5 rounded-full text-lg font-medium hover:bg-black transition-all shadow-xl"
          >
            Create Your Invitation
          </Link>
          <p className="text-sm text-gray-400 mt-6 italic">
            Free to start • No credit card required
          </p>
        </section>

      </div>
    </div>
  );
}