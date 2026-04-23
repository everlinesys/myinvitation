import { useState } from "react";

// Components
import FormPanel from "../components/editor/FormPanel";
import TemplateSelector from "../components/editor/TemplateSelector";
import PreviewPane from "../components/editor/PreviewPane";

// Data
import { defaultData } from "../data/defaultData";
import { templates } from "../templates";

export default function Editor() {
  const [data, setData] = useState(defaultData);
  const [selectedTemplate, setSelectedTemplate] = useState("hinduClassic");

  const TemplateComponent = templates[selectedTemplate];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      
      {/* 🧾 LEFT SIDE — Controls */}
      <div className="space-y-6">
        
        {/* Template Switcher */}
        <TemplateSelector
          selected={selectedTemplate}
          onChange={setSelectedTemplate}
        />

        {/* Form Inputs */}
        <FormPanel data={data} setData={setData} />
      </div>

      {/* 🎨 RIGHT SIDE — Live Preview */}
      <div className="flex justify-center items-start">
        <PreviewPane>
          <TemplateComponent data={data} />
        </PreviewPane>
      </div>

    </div>
  );
}