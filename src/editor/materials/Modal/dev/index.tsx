import { componentCommonProps } from "../../../interface";
import { useMaterialDrop } from "../../../hooks/useMaterialDrop";
export default function Modal({
  id,
  style,
  title,
  children,
}: componentCommonProps) {
  const { canDrop, drop } = useMaterialDrop(["Button", "Container",'Table'], id);

  return (
    <div
      ref={drop}
      data-component-id={id}
      style={style}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
    >
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
}
