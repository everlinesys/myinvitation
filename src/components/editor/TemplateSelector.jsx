import { templatesMeta } from "../../data/templatesMeta";

export default function TemplateSelector({ selected, onChange }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider">
          1. Select Style
        </h2>
        <span className="text-[10px] text-stone-400 font-medium px-2 py-0.5 bg-stone-100 rounded">
          {templatesMeta.length} Designs
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
        {templatesMeta.map((t) => {
          const isSelected = selected === t.id;
          
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`relative flex-shrink-0 group transition-all duration-300 snap-start ${
                isSelected ? "scale-100" : "scale-[0.98] hover:scale-100"
              }`}
            >
              {/* Thumbnail Container */}
              <div
                className={`w-24 h-32 rounded-xl mb-2 overflow-hidden transition-all duration-300 ring-2 ring-offset-2 ${
                  isSelected
                    ? "ring-rose-500 shadow-lg shadow-rose-100"
                    : "ring-transparent border border-stone-200 group-hover:border-stone-400"
                }`}
              >
                {/* Mock Image Placeholder */}
                <div className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${t.previewColor || 'bg-stone-200'}`}>
                   {/* Gradient overlay for depth */}
                   <div className="w-full h-full bg-gradient-to-tr from-black/10 to-transparent" />
                </div>

                {/* Selection Checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-0.5 shadow-md">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>

              <p className={`text-[11px] font-medium transition-colors ${
                isSelected ? "text-stone-900" : "text-stone-500"
              }`}>
                {t.name}
              </p>
            </button>
          );
        })}
      </div>

      {/* Styled Scrollbar CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f5f5f4; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e7e5e4; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d6d3d1; }
      `}} />
    </div>
  );
}