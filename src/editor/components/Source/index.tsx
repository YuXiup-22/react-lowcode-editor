import { useComponentStore } from "../../stores/components";
import MonacoEditor from "@monaco-editor/react";
export default function Source() {
  const { components } = useComponentStore();
  return (
    <MonacoEditor
      path="components.json"
      language="json"
      value={JSON.stringify(components, null, 2)}
      options={{
        readOnly: true,
        fontSize: 14,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine:false,
        scrollbar: {
            verticalScrollbarSize:6,
            horizontalScrollbarSize:6,
        },
      }}
    ></MonacoEditor>
  );
}
