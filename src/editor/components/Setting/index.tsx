import { useComponentStore } from "../../stores/components"
import { Segmented } from "antd";
import { useState } from 'react';
import ComponentAttr from "./ComponentAttr";
import ComponentEvent from "./ComponentEvent";
import ComponentStyle from "./ComponentStyle";
export default function Setting() {
    const {curComponentId} = useComponentStore();
    const [key, setKey] = useState('属性');
    // 没有选中组件时，不显示设置面板
    if(!curComponentId) return null;

    return <div>
        <Segmented options={
            ['属性','样式','事件']
        }
        onChange={setKey}
        value={key}
        block
        ></Segmented>
        <div className="pt-[20px]">
            {key === '属性' && <ComponentAttr/>}
            {key === '样式' && <ComponentStyle/>}
            {key === '事件' && <ComponentEvent/>}
        </div>
    </div>
    
}