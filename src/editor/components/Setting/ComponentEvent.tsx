import { Collapse, CollapseProps, Select, Space, Button } from "antd";
import { useComponentConfigStore } from "../../stores/component-config";
import type { ComponentEvent } from "../../stores/component-config";
import { useComponentStore } from "../../stores/components";
import { useState } from "react";
import ActionModal from "./ActionModal";
import { ShowMessageConfig } from "./actions/showMessage";
import { GotoLinkConfig } from "./actions/GoToLink";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CustomJSConfig } from "./actions/CustomJS";
export default function ComponentEvent() {
  const { componentConfig } = useComponentConfigStore();
  const { curComponent, curComponentId, updateComponentProps } =
    useComponentStore();
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [curEvnet, setCurEvent] = useState<ComponentEvent>();
  const [curAction, setCurAction] = useState<ShowMessageConfig|GotoLinkConfig|CustomJSConfig>();
  const [curActionIndex,setCurActionIndex] = useState<number>(-1)
  if (!curComponent) return null;
  function handleModalOk(config?: ShowMessageConfig | GotoLinkConfig|CustomJSConfig) {
    debugger
    if (!curComponentId||!curEvnet) return;
    if(curActionIndex!==-1){
        updateComponentProps(curComponentId,{
            [curEvnet!.name]:{
                actions:curComponent?.props[curEvnet.name]?.actions?.map((item:ShowMessageConfig|GotoLinkConfig|CustomJSConfig,index:number)=>{
                    return index === curActionIndex?config:item
                })
            }
        })
    }else{
    updateComponentProps(curComponentId, {
      [curEvnet!.name]: {
        actions: [
          ...(curComponent?.props[curEvnet!.name]?.actions || []),
          config,
        ],
      },
    });}
    setCurActionIndex(-1)
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
  function editAction(config:ShowMessageConfig|GotoLinkConfig|CustomJSConfig,index:number,Item:ComponentEvent) {
    setCurActionIndex(index)
    setCurAction(config)
    setCurEvent(Item)
    setActionModalOpen(true)
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
            curComponent.props[Item.name]?.actions.map((config:ShowMessageConfig|GotoLinkConfig|CustomJSConfig, index:number) => {
              return (
                <div>
                  {
                    config.type === 'goToLink'&&<div className="border border-[#aaa] px-[10px] m-[10px]">
                        <div className="text-[blue] flex justify-between">跳转链接
                            <EditOutlined style={{color:'black'}} onClick={()=>editAction(config,index,Item)}></EditOutlined>
                            <DeleteOutlined style={{color:'black'}}  onClick={()=>deleteAction(Item.name,index)}></DeleteOutlined>
                        </div>
                        <div> {config.url} </div>
                    </div>
                  }
                  {
                    config.type === 'showMessage'&&<div className="border border-[#aaa] px-[10px] m-[10px]">
                        <div className="text-[blue] flex justify-between">消息提示
                        <EditOutlined style={{color:'black'}} onClick={()=>editAction(config,index,Item)}></EditOutlined>

                        <DeleteOutlined style={{color:'black'}} onClick={()=>deleteAction(Item.name,index)}></DeleteOutlined>

                        </div>
                        <div>{config.config.type}</div>
                        <div>{config.config.text}</div>
                        </div>
                  }
                  {
                    config.type === 'customJS'&&<div className="border border-[#aaa] px-[10px] m-[10px]">
                    <div className="text-[blue] flex justify-between">自定义JS
                    <EditOutlined style={{color:'black'}} onClick={()=>editAction(config,index,Item)}></EditOutlined>

                    <DeleteOutlined style={{color:'black'}} onClick={()=>deleteAction(Item.name,index)}></DeleteOutlined>

                    </div>
                    
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
        action={curAction}
        onOk={handleModalOk}
      ></ActionModal>
    </div>
  );
}
