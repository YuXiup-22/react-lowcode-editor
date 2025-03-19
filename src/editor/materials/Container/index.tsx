import { PropsWithChildren } from "react";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
export default function Container({ children, id, name }: PropsWithChildren) {
  const {drop,canDrop } = useMaterialDrop(['Button'],id)
  return (
    <div
      ref={drop}
      style={{ border: canDrop ? "1px solid blue" : "border-[#000]" }}
      className="border-[1px] border-[#000] min-h-[100px] p-[20px]"
    >
      {children}
    </div>
  );
}
