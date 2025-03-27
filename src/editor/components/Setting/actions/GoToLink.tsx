import { ComponentEvent } from "../../../stores/component-config";
import { useComponentStore } from "../../../stores/components";
import { Space, Input } from "antd";
export default function GoToLink(props: { event: ComponentEvent }) {
  const { event } = props;
  const { curComponent, curComponentId, updateComponentProps } =
    useComponentStore();

  function urlChange(eventName: string, url: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        url: url,
      },
    });
  }
  return (
    <div className="pt-[10px]">
      <Space>
        <div>链接:</div>
        <Input
          type="text"
          value={curComponent?.props[event.name]?.url}
          onChange={(e) => {
            urlChange(event.name, e.target.value);
          }}
        ></Input>
      </Space>
    </div>
  );
}
