import { useComponentStore,Component } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import React from "react";

export default function Preview(params:type) {
    const { components } = useComponentStore()
    const { componentConfig  } = useComponentConfigStore()
    function renderComponent(components:Component[]):React.ReactNode {
        return components.map(component=>{
            const config = componentConfig[component.name]
            if(!config.prod) return null
            return React.createElement(config.prod,{
                key: component.id,
                id: component.id, //将id,name传到对应的组件
                name: component.name,
                ...config.defaultProps,
                ...component.props,
                style: component?.style,
            },renderComponent(component.children||[]))
        })
    }
    return <div className="h-[100%]">
        {renderComponent(components)}
    </div>
}