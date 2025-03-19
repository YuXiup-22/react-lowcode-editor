import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponentStore } from "../stores/components";

export function useMaterialDrop(accept: string[], id: number) {
  const { addComponent } = useComponentStore();
  const { componentConfig } = useComponentConfigStore();
  const [{ canDrop }, drop] = useDrop({
    accept: accept,
    drop: (item: { type: string }, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      // 传递进来的组件，然后渲染
      const props = componentConfig[item.type].defaultProps;
      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props,
        },
        id
      );
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
