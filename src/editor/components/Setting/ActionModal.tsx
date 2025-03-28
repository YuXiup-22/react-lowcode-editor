import { Modal, Segmented } from "antd";
import { ComponentEvent } from "../../stores/component-config";
import { act, useEffect, useState } from "react";
import GoToLink from "./actions/GoToLink";
import ShowMessage from "./actions/showMessage";
import CustomJS from "./actions/CustomJS";
interface ActionModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (config?:GotoLinkConfig|ShowMessageConfig|CustomJSConfig) => void;
  event: ComponentEvent;
  action?:GotoLinkConfig|ShowMessageConfig|CustomJSConfig
}
import { GotoLinkConfig } from "./actions/GoToLink";
import { ShowMessageConfig } from "./actions/showMessage";
import { CustomJSConfig } from "./actions/CustomJS";
export default function ActionModal(props: ActionModalProps) {
  const { visible, onCancel, onOk, event,action } = props;
  const map  = {
    goToLink:'访问链接',
    showMessage:'消息提示',
    customJS:'自定义js'
  }
  const [key, setKey] = useState("访问链接");
  const [curConfig, setCurConfig] = useState<GotoLinkConfig|ShowMessageConfig|CustomJSConfig>()
  useEffect(()=>{
    setKey(map[action?.type||'goToLink'])
  },[action])
  return (
    <Modal
      width={800}
      title="事件动作配置"
      open={visible}
      onOk={()=>onOk(curConfig)}
      onCancel={onCancel}
    >
      <Segmented
        value={key}
        onChange={(value) => setKey(value)}
        options={["访问链接", "消息提示", "自定义js"]}
        block
      ></Segmented>
      <div className="h-[500px]">
        {key === "访问链接" && <GoToLink value={action?.type === 'goToLink'?action.url:''}  onChange={config=>{
            setCurConfig(config)
        }} ></GoToLink>}
        {key === "消息提示" && <ShowMessage value={action?.type==='showMessage'?action.config:undefined}  onChange={config=>{
            setCurConfig(config)
        }}></ShowMessage>}
        {
            key === "自定义js" && <CustomJS value={action?.type==='customJS'?action.value:''} onChange={config=>{
              setCurConfig(config)
            }}></CustomJS>
        }
      </div>
    </Modal>
  );
}
