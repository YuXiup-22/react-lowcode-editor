import { useDrag } from "react-dnd";
import { useMaterialDrop } from "../../../hooks/useMaterialDrop";
import { componentCommonProps } from "../../../interface";
import { useEffect, useRef } from "react";
export default function Container({ children, id, name,style }: componentCommonProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const { drop, canDrop } = useMaterialDrop(["Button","Container",'Table'], id);
  const [_, drag] = useDrag({
    type: "Container",
    item: {
      type: "Container",
      dragType: "move",
      id,
    },
  });
  useEffect(()=>{
    drag(divRef.current)
    drop(divRef.current)
  },[])
  return (
    <div
      ref={divRef}
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
