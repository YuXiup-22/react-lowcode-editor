import { Modal, Segmented } from "antd";
import { ComponentEvent } from "../../stores/component-config";
import {  useEffect, useState } from "react";
import GoToLink from "./actions/GoToLink";
import ShowMessage from "./actions/showMessage";
import CustomJS from "./actions/CustomJS";
import ComponentMethod from "./actions/componentMethod";

interface ActionModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (config?:GotoLinkConfig|ShowMessageConfig|CustomJSConfig|ComponentMethodConfig) => void;
  event: ComponentEvent;
  action?:GotoLinkConfig|ShowMessageConfig|CustomJSConfig|ComponentMethodConfig
}
import { GotoLinkConfig } from "./actions/GoToLink";
import { ShowMessageConfig } from "./actions/showMessage";
import { CustomJSConfig } from "./actions/CustomJS";
import { ComponentMethodConfig } from "./actions/componentMethod";
export default function ActionModal(props: ActionModalProps) {
  const { visible, onCancel, onOk, event,action } = props;
  const map  = {
    goToLink:'访问链接',
    showMessage:'消息提示',
    customJS:'自定义js',
    componentMethod:'组件方法'
  }
  const [key, setKey] = useState("访问链接");
  const [curConfig, setCurConfig] = useState<GotoLinkConfig|ShowMessageConfig|CustomJSConfig|ComponentMethodConfig>()
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
        options={["访问链接", "消息提示", "自定义js",'组件方法']}
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
        {
            key === "组件方法" && <ComponentMethod  value={action?.type === 'componentMethod' ? action.config : undefined} onChange={config=>{
                setCurConfig(config)
              }}></ComponentMethod>
        }
      </div>
    </Modal>
  );
}
