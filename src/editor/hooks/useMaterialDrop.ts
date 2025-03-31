import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { getComponentById, useComponentStore } from "../stores/components";
interface ItemType {
  dragType: "move" | "add";
  type: string;
  id: number;
}
export function useMaterialDrop(accept: string[], id: number) {
  const { addComponent, components, deleteComponent } = useComponentStore();
  const { componentConfig } = useComponentConfigStore();
  const [{ canDrop }, drop] = useDrop({
    accept: accept,
    drop: (item: ItemType, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      // 编辑区内部的拖拽特殊处理
      if (item.dragType === "move") {
        const component = getComponentById(item.id, components)!;
        deleteComponent(item.id);
        addComponent(component, id);
      } else {
        // 传递进来的组件，然后渲染
        const config = componentConfig[item.type];
        addComponent(
          {
            id: new Date().getTime(),
            name: item.type,
            props: config.defaultProps,
            desc: config.desc,
            style: {
              // backgroundColor:'red',
            },
          },
          id
        );
      }
    },
    collect(monitor) {
      return {
        canDrop: monitor.canDrop(),
      };
    },
  });

  return {
    drop,
    canDrop,
  };
}
