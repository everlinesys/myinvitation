import { templatesMeta } from "../../data/templatesMeta";

export default function TemplateSelector({ selected, onChange }) {
  return (
    <div>
      <h2 className="font-semibold mb-2">Choose Template</h2>

      <div className="flex gap-3 overflow-x-auto">
        {templatesMeta.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`p-2 rounded border ${
              selected === t.id ? "border-black" : "border-gray-300"
            }`}
          >
            <div className="w-20 h-28 bg-gray-300 mb-1 rounded"></div>
            <p className="text-xs">{t.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}