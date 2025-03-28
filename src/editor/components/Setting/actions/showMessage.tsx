import { Select, Space, Input } from "antd";
import { useComponentStore } from "../../../stores/components";
import { useState } from "react";

export interface ShowMessageConfig {
  type: "showMessage";
  config: {
    type: "success" | "error" | "warning";
    text: string;
  };
}
interface ShowMessageProps {
  value?: ShowMessageConfig["config"];
  onChange?: (config: ShowMessageConfig) => void;
}
export default function ShowMessage(props: ShowMessageProps) {
  const { value, onChange } = props;
  const { curComponentId } = useComponentStore();
  const [type, setType] = useState<"success" | "error" | "warning">(
    value?.type || "success"
  );
  const [text, setText] = useState(value?.text || "");
  const handleTypeChange = (value: "success" | "error" | "warning") => {
    if (!curComponentId) return;
    setType(value);
    onChange?.({
      type: "showMessage",
      config: {
        type: value,
        text,
      },
    });
  };
  const handleMessageChange = (value: string) => {
    if (!curComponentId) return;
    setText(value);
    onChange?.({
      type: "showMessage",
      config: {
        type,
        text: value,
      },
    });
  };
  return (
    <div>
      <div className="pt-[10px]">
        <Space>
          <div>类型:</div>
          <Select
            className="w-[160px]"
            options={[
              {
                value: "success",
                label: "成功",
              },
              {
                value: "error",
                label: "失败",
              },
              {
                value: "warning",
                label: "警告",
              },
            ]}
            onChange={(value) => {
              handleTypeChange(value);
            }}
            value={type}
          ></Select>
        </Space>
      </div>
      <div className="pt-[10px]">
        <Space>
          <div>内容:</div>
          <Input
            style={{ width: 500 }}
            value={text}
            onChange={(e) => handleMessageChange(e.target.value)}
          ></Input>
        </Space>
      </div>
    </div>
  );
}
