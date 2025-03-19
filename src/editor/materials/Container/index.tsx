import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { componentCommonProps } from "../../interface";
export default function Container({ children, id, name }: componentCommonProps) {
  const { drop, canDrop } = useMaterialDrop(["Button"], id);
  return (
    <div
      ref={drop}
      data-component-id={id}
      className={`border-[1px]  ${
        canDrop ? "border-[blue]" : "border-[#000]"
      }  min-h-[100px] p-[20px]`}
    >
      {children}
    </div>
  );
}
