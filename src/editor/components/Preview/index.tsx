import { useComponentStore,Component } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import React from "react";
import { message } from "antd";
import {ShowMessageConfig} from "../Setting/actions/showMessage";
import { GotoLinkConfig } from "../Setting/actions/GoToLink";
export default function Preview(params:type) {
    const { components } = useComponentStore()
    const { componentConfig  } = useComponentConfigStore()
    // 统一处理事件
    function handleEvent(component:Component) {
        const props :Record<string,any> = {}
        componentConfig[component.name].events?.forEach(event=>{
            const eventConfig = component.props[event.name]
            if(eventConfig){
                // 给事件绑定方法，根据事件的选中类型，执行对应的方法
                props[event.name] = ()=>{
                    eventConfig?.actions.map((action:ShowMessageConfig|GotoLinkConfig)=>{
                        if(action.type === 'goToLink'&&action.url){
                            window.location.href = action.url
                        }else if(action.type === 'showMessage'&&action.config){
                            
                            if(action.config.text&&action.config.type == 'success'){
                                message.success(action.config.text) 
                            }else if(action.config.text&&action.config.type == 'error'){
                                message.error(action.config.text)
                            }else if(action.config.text&&action.config.type == 'warning'){
                                message.warning(action.config.text)
                            }
                        }
                    })
                    
                }
            }
        })
        return props
    }
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
                ...handleEvent(component)
            },renderComponent(component.children||[]))
        })
    }
    return <div className="h-[100%]">
        {renderComponent(components)}
    </div>
}