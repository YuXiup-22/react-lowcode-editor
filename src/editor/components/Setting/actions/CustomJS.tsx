import MonacoEditor,{OnMount} from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useComponentStore } from "../../../stores/components";
export interface CustomJSConfig{
    type:'customJS',
    value:string
}

interface CustomJSProps{
    value?:string,
    defaultValue?:string,
    onChange?:(config:CustomJSConfig)=>void
}
export default function CustomJS(props:CustomJSProps) {
    const { defaultValue,onChange,value:val } = props;
    
    const [value,setValue] = useState(defaultValue)
    useEffect(()=>{
        setValue(val)
    },[val])
    const { curComponentId } = useComponentStore()
    function valueChange( value?: string) {
        if (!curComponentId) return;
        setValue(value)
        onChange?.({
            type:'customJS',
            value:value!
        })
    }
    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        });
    }
    return (
        <div className="flex items-start gap-[20px] ">
            <div >自定义</div>
            <div >
                <MonacoEditor
                width={'600px'}
                height={'400px'}
                language="javascript"
                onChange={valueChange}
                value={value}
                onMount={handleEditorMount}
                options={{
                    minimap: { enabled: false }, // 关闭小地图
                    scrollBeyondLastLine: false, // 禁止滚动到最后一行
                    fontSize: 14,
                    scrollbar: {
                        verticalScrollbarSize: 6,
                        horizontalScrollbarSize: 6,
                    },
                }}
                ></MonacoEditor>
            </div>
        </div>
    )
}