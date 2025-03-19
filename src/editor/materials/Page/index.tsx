import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { componentCommonProps } from "../../interface";
export default function Page({ children, id, name }: componentCommonProps) {
    const {drop,canDrop} = useMaterialDrop(['Container','Button'],id)
  return (
    <div
    data-component-id={id}
      ref={drop}
      className="h-[100%] p-[20px] box-border"
      style={{ border: canDrop ? "2px solid blue" : "none" }}
    >
      {children}
    </div>
  );
}
