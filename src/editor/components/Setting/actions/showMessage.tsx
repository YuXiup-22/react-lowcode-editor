import { Select, Space, Input } from "antd";
import { ComponentEvent } from "../../../stores/component-config";
import { useComponentStore } from "../../../stores/components";

export default function ShowMessage(props: { event: ComponentEvent }) {
  const { event } = props;
  const { curComponent, curComponentId, updateComponentProps } =
    useComponentStore();
  const handleTypeChange = (eventName: string, value: string) => {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          type: value,
        },
      },
    });
  };
  const handleMessageChange = (eventName: string, value: string) => {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          text: value,
        },
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
              handleTypeChange(event.name, value);
            }}
            value={curComponent?.props?.[event.name]?.config?.type}
          ></Select>
        </Space>
      </div>
      <div className="pt-[10px]">
        <Space>
          <div>内容:</div>
          <Input
            value={curComponent?.props[event.name]?.config?.text}
            onChange={(e) => handleMessageChange(event.name, e.target.value)}
          ></Input>
        </Space>
      </div>
    </div>
  );
}
