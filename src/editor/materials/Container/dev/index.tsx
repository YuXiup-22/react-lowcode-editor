import { useMaterialDrop } from "../../../hooks/useMaterialDrop";
import { componentCommonProps } from "../../../interface";
export default function Container({ children, id, name,style }: componentCommonProps) {
  const { drop, canDrop } = useMaterialDrop(["Button","Container"], id);
  return (
    <div
      ref={drop}
      data-component-id={id}
      style={style}
      className={`border-[1px]  ${
        canDrop ? "border-[blue]" : "border-[#000]"
      }  min-h-[100px] p-[20px]`}
    >
      {children}
    </div>
  );
}
