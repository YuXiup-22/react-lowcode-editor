import TextArea from "antd/es/input/TextArea";
import { ComponentEvent } from "../../../stores/component-config";
import { useComponentStore } from "../../../stores/components";
import { Space, Input } from "antd";
import { useState } from "react";
export interface GotoLinkConfig{
    type:'goToLink',
    url:string
}
interface GotoLinkProps{
    defaultValue?:string,
    onChange:(config:GotoLinkConfig)=>void
}
export default function GoToLink(props: GotoLinkProps) {
  const { defaultValue,onChange } = props;
  const {  curComponentId, } =
    useComponentStore();
    const [url,setUrl] = useState(defaultValue||'')
  function urlChange( value: string) {
    if (!curComponentId) return;
    setUrl(value)
    onChange({
        type:'goToLink',
        url:value
    })
  }
  return (
    <div className="pt-[10px]">
      <Space>
        <div>链接:</div>
        <TextArea
        style={{height: 200, width: 500, border: '1px solid #000'}}
        value={url}
        onChange={(e) => {
          urlChange( e.target.value);
        }}
        ></TextArea>
      </Space>
    </div>
  );
}
