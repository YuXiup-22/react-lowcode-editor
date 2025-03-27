import { Collapse, CollapseProps, Select, Space } from "antd";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponentStore } from "../../stores/components";
import GoToLink from "./actions/GoToLink";
import ShowMessage from "./actions/showMessage";
export default function ComponentEvent() {
  const { componentConfig } = useComponentConfigStore();
  const { curComponent,curComponentId,updateComponentProps } = useComponentStore();
  if (!curComponent) return null;
  function handleActionChange(value:string,eventName:string) {
    if(!curComponentId) return
    updateComponentProps(curComponentId,{
        [eventName]:{
            type:value,
        }
    })
  }
  const items: CollapseProps["items"] = (
    componentConfig[curComponent?.name]?.events || []
  ).map((Item,) => {
    return {
      key: Item.name,
      label: Item.label,
      children: 
        <div>
          <Space>
            <div>动作:</div>
            <Select
              className="w-[160px]"
              options={[
                { label: '显示提示', value: 'showMessage' },
                { label: '跳转链接', value: 'goToLink' },
            ]}
            onChange={(value)=>handleActionChange(value,Item.name)}
              value={curComponent?.props[Item.name]?.type}
            ></Select>
          </Space>
          {
            curComponent.props[Item.name]?.type==='goToLink'&&
            <GoToLink event={Item}></GoToLink>
          }
          {
            curComponent.props[Item.name]?.type === 'showMessage'&&
            <ShowMessage event={Item}></ShowMessage>
          }
        </div>
      ,
    };
  });
  return (
    <div className="px-[10px]">
      <Collapse className='mb-[10px]' items={items}></Collapse>
    </div>
  );
}
