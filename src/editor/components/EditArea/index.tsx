import React, { useEffect } from "react";
import { Component, useComponentStore } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
export default function EditorArea() {
  const { components, addComponent } = useComponentStore();
  const { componentConfig } = useComponentConfigStore();
//   useEffect(() => {
//     addComponent(
//       {
//         id: 222,
//         name: "Container",
//         props: {},
//         children: [],
//       },
//       1
//     );
//     addComponent(
//       {
//         id: 333,
//         name: "Button",
//         props: {
//           text: "yuxi",
//         },
//         children: [],
//       },
//       222
//     );
//   }, []);
    //递归遍历树，渲染组件 
  function renderComponent(components: Component[]):React.ReactNode {
    return components.map(component=>{
        const config = componentConfig?.[component.name]
        if(!config?.component) return null

        return React.createElement(
            config.component,
            {
                key:component.id,
                id:component.id, //将id,name传到对应的组件
                name:component.name,
                ...config.defaultProps,
                ...component.props
            },
            renderComponent(component.children||[])
        )
    })
  }
  return (
    <div className="h-[100%]">
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {/* 渲染组件 */ renderComponent(components)}
    </div>
  );
}
