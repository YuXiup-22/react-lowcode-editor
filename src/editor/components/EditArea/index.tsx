import React, { MouseEventHandler, useEffect, useState } from "react";
import { Component, useComponentStore } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import HoverMask from "../HoverMask";
export default function EditorArea() {
  const { components, addComponent } = useComponentStore();
  const { componentConfig } = useComponentConfigStore();
  const [hoverComponentId,setHoverComponentId] = useState<number>()
  //递归遍历树，渲染组件
  function renderComponent(components: Component[]): React.ReactNode {
    return components.map((component) => {
      const config = componentConfig?.[component.name];
      if (!config?.component) return null;

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id, //将id,name传到对应的组件
          name: component.name,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponent(component.children || [])
      );
    });
  }
  const handleMouseOver:MouseEventHandler = (e)=> {
    const path = e.nativeEvent.composedPath()
    console.log(path)
    // 获取到哪个对象触发，
    for(let i = 0;i<path.length;i++){
        const ele = path[i] as HTMLElement
        const componentId = ele.dataset.componentId
        if(componentId){
            setHoverComponentId(+componentId)
            return
        }
    }
  }
  return (
    <div className="h-[100%] edit-area"  onMouseOver={handleMouseOver} onMouseLeave={()=>setHoverComponentId(undefined)} >
        {/* 渲染组件 */ renderComponent(components)}
        {hoverComponentId&&(
            <HoverMask
            portalWrapperClassName='portal-wrapper'
                componentId={hoverComponentId}
                containerClassName="edit-area"
            ></HoverMask>
        )}
        <div className="portal-wrapper"></div>
    </div>
  );
}
