import { PropsWithChildren } from "react";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
export default function Page({ children, id, name }: PropsWithChildren) {
    const {drop,canDrop} = useMaterialDrop(['Container','Button'],id)
  return (
    <div
      ref={drop}
      className="h-[100%] p-[20px] box-border"
      style={{ border: canDrop ? "2px solid blue" : "none" }}
    >
      {children}
    </div>
  );
}
