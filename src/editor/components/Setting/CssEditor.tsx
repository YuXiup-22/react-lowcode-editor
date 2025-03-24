import MonacoEditor,{ EditorProps } from "@monaco-editor/react";
import { editor } from "monaco-editor";
interface Props{
    value:string,
    onChange:EditorProps['onChange'],
    options?:editor.IStandaloneDiffEditorConstructionOptions
}
export default function CssEditor(props:Props) {
    const {value,onChange,options} = props;
    

    return <MonacoEditor></MonacoEditor>

    
}