/**
 * 保存全局的json
 */
import { create } from "zustand";

interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
  parentId?: number;
}

interface State {
  components: Component[];
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: any) => void;
}

 const useComponentStore = create<State & Action>((set, get) => ({
  components: [
    {
      id: 1,
      name: "Page",
      props: {},
      desc: "页面",
    },
  ],
  addComponent: (component, parentId) =>
    set((state) => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);
        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component);
          } else {
            parentComponent.children = [component];
          }
          component.parentId = parentId;
          return {
            components: [...state.components],
          };
        }
      }
      return {
        components: [...state.components, component],
      };
    }),
  deleteComponent: (componentId: number) => {
    if (!componentId) return null;
    const component = getComponentById(componentId, get().components);
    if (component?.parentId) {
      const parentComponent = getComponentById(
        component.parentId,
        get().components
      );
      if (parentComponent) {
        // +表示转换为数字类型
        parentComponent.children = parentComponent.children?.filter(
          (component) => component.id !== componentId
        );
        set({
          components: [...get().components],
        });
      }
    }
  },
  updateComponentProps: (componentId, props) =>
    set((state) => {
      const component = getComponentById(componentId, get().components);
      if (component) {
        component.props = { ...component.props, ...props };
        return {
          components: [...state.components],
        };
      }
      return {
        components: [...state.components],
      };
    }),
}));

function getComponentById(
  id: number,
  components: Component[]
): Component | null {
  if (!id) return null;
  for (const component of components) {
    if (component.id === id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}
export {
  useComponentStore,
  getComponentById
};
export type { Component };
