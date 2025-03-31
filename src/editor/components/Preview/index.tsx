import { useComponentStore, Component } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import React, { useRef } from "react";
import { message } from "antd";
import ShowMessage, { ShowMessageConfig } from "../Setting/actions/showMessage";
import { GotoLinkConfig } from "../Setting/actions/GoToLink";
import { CustomJSConfig } from "../Setting/actions/CustomJS";
import { ComponentMethodConfig } from "../Setting/actions/componentMethod";
export default function Preview(params: type) {
  const { components } = useComponentStore();
  const { componentConfig } = useComponentConfigStore();
  const componentRefs = useRef<Record<string,any>>({})

  // 统一处理事件
  function handleEvent(component: Component) {
    const props: Record<string, any> = {};
    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];
      if (eventConfig) {
        // 给事件绑定方法，根据事件的选中类型，执行对应的方法
        props[event.name] = () => {
          eventConfig?.actions.map(
            (action: ShowMessageConfig | GotoLinkConfig | CustomJSConfig|ComponentMethodConfig) => {
              if (action.type === "goToLink" && action.url) {
                window.location.href = action.url;
              } else if (action.type === "showMessage" && action.config) {
                if (action.config.text && action.config.type == "success") {
                  message.success(action.config.text);
                } else if (
                  action.config.text &&
                  action.config.type == "error"
                ) {
                  message.error(action.config.text);
                } else if (
                  action.config.text &&
                  action.config.type == "warning"
                ) {
                  message.warning(action.config.text);
                }
              } else if (action.type === "customJS" && action.value) {
                // 执行自定义的js代码 ,context是当前组件的props,action.value是js代码
                const func = new Function('context', action.value);
                func({
                    name:component.name, //组件名称,
                    props:component.props, //组件的props,
                    ShowMessage(content:string){
                        message.success(content)
                    }
                });
              } else if (action.type === "componentMethod" && action.config) {
                // 收集执行动作组件的ref
                const component = componentRefs.current[action.config.componentId]
                if(component){
                  component[action.config.method]?.()
                }
              }
            }
          );
        };
      }
    });
    return props;
  }
  function renderComponent(components: Component[]): React.ReactNode {
    return components.map((component) => {
      const config = componentConfig[component.name];
      if (!config.prod) return null;
      return React.createElement(
        config.prod,
        {
          ref:(ref:Record<string,any>)=>{componentRefs.current[component.id] = ref},
          key: component.id,
          id: component.id, //将id,name传到对应的组件
          name: component.name,
          ...config.defaultProps,
          ...component.props,
          style: component?.style,
          ...handleEvent(component),
        },
        renderComponent(component.children || [])
      );
    });
  }
  return <div className="h-[100%]">{renderComponent(components)}</div>;
}
