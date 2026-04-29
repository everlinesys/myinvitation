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

export default function Editor() {
  const [data, setData] = useState(defaultData);
  const [selectedTemplate, setSelectedTemplate] = useState("christianFloral");

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Restore after login
  useEffect(() => {
    if (location.state?.restoredData) {
      setData((prev) => ({
        ...prev,
        ...location.state.restoredData,
      }));
    }
  }, [location.state]);

  const TemplateComponent =
    templates[selectedTemplate] || templates["christianFloral"];

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

      if (!res?.slug) throw new Error("Invalid response");

      navigate(`/invite/${res.slug}`);
    } catch (err) {
      console.error(err);
      alert("Failed to save invitation");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] overflow-x-hidden w-full">

      {/* 🔝 HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

          <div className="text-center sm:text-left">
            <h1 className="text-xl font-serif text-stone-800">
              Design Studio
            </h1>
            <p className="text-xs text-stone-400 uppercase tracking-widest">
              Live Preview Mode
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1">
            <button
              onClick={handleSave}
              className="bg-stone-900 text-white px-6 sm:px-8 py-2.5 rounded-full text-sm font-medium hover:bg-stone-800 transition active:scale-95"
            >
              {token ? "Save & Generate Link" : "Login to Save & Send"}
            </button>

            {!token && (
              <p className="text-[10px] text-rose-500 font-medium text-center sm:text-right">
                * Progress is temporary until you login
              </p>
            )}
          </div>

        </div>
      </header>

      {/* 🧠 MAIN */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 overflow-x-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* 🧾 LEFT */}
          <div className="lg:col-span-5 space-y-8 min-w-0">

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

          </div>

          {/* 🎨 RIGHT */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 self-start min-w-0">

            <div className="relative w-full max-w-full bg-stone-100 rounded-[2rem] overflow-hidden flex items-center justify-center border-4 border-white shadow-inner">

              <div className="w-full h-full p-4 md:p-8 overflow-y-auto overflow-x-hidden custom-scrollbar flex justify-center">

                <PreviewPane>
                  <div className="max-w-full scale-90 md:scale-100 origin-top transition-transform">
                    <TemplateComponent data={data} />
                  </div>
                </PreviewPane>

              </div>

              <div className="absolute bottom-4 right-6 bg-white/60 backdrop-blur px-3 py-1 rounded-full text-[10px] text-stone-500 border border-white/50">
                Preview
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* 🎯 Scrollbar styling */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 10px;
        }
      `
      }} />
    </div>
  );
}