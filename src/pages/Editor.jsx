import { useState, useEffect } from "react";
import { createInvitation } from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";

// Components
import FormPanel from "../components/editor/FormPanel";
import TemplateSelector from "../components/editor/TemplateSelector";
import PreviewPane from "../components/editor/PreviewPane";

// Data
import { defaultData } from "../data/defaultData";
import { templates } from "../templates";
import { startPayment } from "../utils/payment";

export default function Editor() {
  const [data, setData] = useState(defaultData);
  const [selectedTemplate, setSelectedTemplate] = useState("hinduClassic");

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  // ✅ Restore data safely after login
  useEffect(() => {
    if (location.state?.restoredData) {
      setData((prev) => ({
        ...prev,
        ...location.state.restoredData,
      }));
    }
  }, [location.state]);

  // ✅ Safe template fallback
  const TemplateComponent =
    templates[selectedTemplate] || templates["hinduClassic"];

  // 🔥 MAIN ACTION
  const handleSave = async () => {
    if (!token) {
      navigate("/login", { state: { from: "editor", data } });
      return;
    }

    try {
      const payload = {
        groom: data.groom,
        bride: data.bride,
        date: data.date,
        time: data.time,
        venue: data.venue,
        message: data.message,
        template: selectedTemplate,
      };
      const res = await createInvitation(payload, token);

      if (!res?.slug) {
        throw new Error("Invalid response from server");
      }

      navigate(`/invite/${res.slug}`);
    } catch (err) {
      console.error("Save error:", err);
      alert(err.message || "Failed to save invitation");
    }
  };
  // const handleSave = async () => {
  //   if (!token) {
  //     navigate("/login", { state: { from: "editor", data } });
  //     return;
  //   }

  //   try {
  //     // 🔥 Check if paid (temporary local flag)
  //     const paid = localStorage.getItem("paid");

  //     if (!paid) {
  //       await startPayment(data, async () => {
  //         localStorage.setItem("paid", "true");

  //         // after payment → save
  //         const payload = {
  //           ...data,
  //           template: selectedTemplate,
  //         };

  //         const res = await createInvitation(payload, token);
  //         navigate(`/invite/${res.slug}`);
  //       });

  //       return;
  //     }

  //     // Already paid
  //     const payload = {
  //       ...data,
  //       template: selectedTemplate,
  //     };

  //     const res = await createInvitation(payload, token);
  //     navigate(`/invite/${res.slug}`);

  //   } catch (err) {
  //     console.error(err);
  //     alert("Payment or save failed");
  //   }
  // };
  return (
    <div className="min-h-screen bg-[#FDFCFB] overflow-x-auto">
      {/* 🛠 TOP BAR (Contextual Actions) */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-serif text-stone-800">Design Studio</h1>
            <p className="text-xs text-stone-400 uppercase tracking-widest">Live Preview Mode</p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <button
              onClick={handleSave}
              className="bg-stone-900 text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 active:scale-95"
            >
              {token ? "Save & Generate Link" : "Login to Save & Send"}
            </button>
            {!token && (
              <p className="text-[10px] text-rose-500 font-medium">
                * Progress is temporary until you login
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-12 gap-10">

          {/* 🧾 LEFT SIDE (Configuration) */}
          <div className="lg:col-span-5 space-y-8">
            <section className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
              <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-6">
                1. Select Style
              </h2>
              <TemplateSelector
                selected={selectedTemplate}
                onChange={setSelectedTemplate}
              />
            </section>

            <section className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
              <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-6">
                2. Wedding Details
              </h2>
              <FormPanel data={data} setData={setData} />
            </section>

            {/* Mobile-only padding to ensure button isn't obscured */}
            <div className="h-10 lg:hidden" />
          </div>

          {/* 🎨 RIGHT SIDE (The Visual) */}
          <div className="lg:col-span-7 lg:sticky lg:top-32 self-start h-[calc(100vh-160px)]">
            <div className="relative h-full w-full bg-stone-100 rounded-[2rem] overflow-hidden flex items-center justify-center border-4 border-white shadow-inner">
              {/* Device Mockup Look */}
              <div className="w-full h-full p-4 md:p-12 overflow-y-auto custom-scrollbar">
                <PreviewPane>
                  <div className="shadow-2xl shadow-stone-400/50 transform origin-top scale-[0.85] md:scale-100 transition-transform">
                    <TemplateComponent data={data} />
                  </div>
                </PreviewPane>
              </div>

              {/* Subtle Label */}
              <div className="absolute bottom-4 right-6 bg-white/50 backdrop-blur px-3 py-1 rounded-full text-[10px] text-stone-500 border border-white/50">
                Visual representation
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Global CSS for the scrollbar within the preview window */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 10px; }
      `}} />
    </div>
  );
}