import { Modal, Segmented } from "antd";
import { ComponentEvent } from "../../stores/component-config";
import { useState } from "react";
import GoToLink from "./actions/GoToLink";
import ShowMessage from "./actions/showMessage";
interface ActionModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (config?:GotoLinkConfig|ShowMessageConfig) => void;
  event: ComponentEvent;
}
import { GotoLinkConfig } from "./actions/GoToLink";
import { ShowMessageConfig } from "./actions/showMessage";
export default function ActionModal(props: ActionModalProps) {
  const { visible, onCancel, onOk, event } = props;
  const [key, setKey] = useState("访问链接");
  const [curConfig, setCurConfig] = useState<GotoLinkConfig|ShowMessageConfig>()
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
        {key === "访问链接" && <GoToLink  onChange={config=>{
            setCurConfig(config)
        }} ></GoToLink>}
        {key === "消息提示" && <ShowMessage  onChange={config=>{
            setCurConfig(config)
        }}></ShowMessage>}
      </div>
    </Modal>
  );
}
