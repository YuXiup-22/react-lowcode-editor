import MonacoEditor, { EditorProps, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
interface Props {
  value: string;
  onChange?: EditorProps["onChange"];
  options?: editor.IStandaloneDiffEditorConstructionOptions;
}
export default function CssEditor(props: Props) {
  const { value, onChange, options } = props;

  const handleEditorMount: OnMount = (editor, monaco) => {
    // 添加格式化快捷键
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };
  return (
    <MonacoEditor
      defaultLanguage="css"
      value={value}
      path="component.css"
      onChange={onChange}
      onMount={handleEditorMount}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    ></MonacoEditor>
  );
}
