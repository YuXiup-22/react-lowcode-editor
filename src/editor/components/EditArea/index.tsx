import { useEffect } from "react";
import { useComponentStore } from "../../stores/components";
export default function EditorArea() {
  const { components, addComponent } = useComponentStore();
  useEffect(() => {
    addComponent(
      {
        id: 2,
        name: "测试",
        props: {},
        children: [],
      },
      1
    );
  }, []);
  return <div><pre>{JSON.stringify(components, null, 2)}</pre></div>;
}
