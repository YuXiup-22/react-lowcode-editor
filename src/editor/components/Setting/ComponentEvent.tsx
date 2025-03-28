import { Collapse, CollapseProps, Select, Space, Button } from "antd";
import { useComponentConfigStore } from "../../stores/component-config";
import type { ComponentEvent } from "../../stores/component-config";
import { useComponentStore } from "../../stores/components";
import { useState } from "react";
import ActionModal from "./ActionModal";
import { ShowMessageConfig } from "./actions/showMessage";
import { GotoLinkConfig } from "./actions/GoToLink";
import { DeleteOutlined } from "@ant-design/icons";
export default function ComponentEvent() {
  const { componentConfig } = useComponentConfigStore();
  const { curComponent, curComponentId, updateComponentProps } =
    useComponentStore();
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [curEvnet, setCurEvent] = useState<ComponentEvent>();
  if (!curComponent) return null;
  function handleModalOk(config?: ShowMessageConfig | GotoLinkConfig) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [curEvnet!.name]: {
        actions: [
          ...(curComponent?.props[curEvnet!.name]?.actions || []),
          config,
        ],
      },
    });
    setActionModalOpen(false);
  }
  function deleteAction(eventName:string,index:number) {
    if (!curComponentId) return;
    const actions = curComponent?.props[eventName]?.actions||[]
    actions.splice(index,1)
    updateComponentProps(curComponentId,{
        [eventName]:{
            actions:actions
        }
    })
  }
  const items: CollapseProps["items"] = (
    componentConfig[curComponent?.name]?.events || []
  ).map((Item) => {
    return {
      key: Item.name,
      label: (
        <div className="flex justify-between leading-[30px]">
          {Item.label}
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation()
              setActionModalOpen(true);
              setCurEvent(Item);
            }}
          >
            添加动作
          </Button>
        </div>
      ),

      children: (
        <div>
          {
            curComponent.props[Item.name]?.actions.map((config:ShowMessageConfig|GotoLinkConfig, index) => {
              return (
                <div>
                  {
                    config.type === 'goToLink'&&<div className="border border-[#aaa] px-[10px] m-[10px]">
                        <div className="text-[blue] flex justify-between">跳转链接
                            <DeleteOutlined style={{color:'black'}}  onClick={()=>deleteAction(Item.name,index)}></DeleteOutlined>
                        </div>
                        <div> {config.url} </div>
                    </div>
                  }
                  {
                    config.type === 'showMessage'&&<div className="border border-[#aaa] px-[10px] m-[10px]">
                        <div className="text-[blue] flex justify-between">消息提示
                        <DeleteOutlined style={{color:'black'}} onClick={()=>deleteAction(Item.name,index)}></DeleteOutlined>

                        </div>
                        <div>{config.config.type}</div>
                        <div>{config.config.text}</div>
                        </div>
                  }
                </div>
              );
            })
          }
        </div>
      ),
    };
  });
  return (
    <div className="px-[10px]">
      <Collapse className="mb-[10px]" items={items} defaultActiveKey={componentConfig[curComponent.name].events?.map(item=>item.name)||[]}></Collapse>
      <ActionModal
        event={curEvnet!}
        visible={actionModalOpen}
        onCancel={() => setActionModalOpen(false)}
        onOk={handleModalOk}
      ></ActionModal>
    </div>
  );
}
