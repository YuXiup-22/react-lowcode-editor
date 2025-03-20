import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { getComponentById,useComponentStore } from "../../stores/components";
interface HoverMaskProps {
  componentId: number;
  containerClassName: string;
  portalWrapperClassName:string,
}

export default function HoverMask({
  componentId,
  containerClassName,
  portalWrapperClassName
}: HoverMaskProps) {
  const [position, setPostion] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop:0,
    labelLeft:0
  });
  function updatePosition() {
    // 获取挂载的dom
    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;
    //   获取蒙层的位置，即需要添加mask的元素
    const target = document.querySelector(`[data-component-id='${componentId}']`);
    if (!target) return;
    const { left, top, width, height } = target.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();
    // 计算mask相对于container,scrolltop加上才是在盒子里的真实距离
    let labelTop = top-containerTop+container.scrollTop
    if(labelTop<=0){
        labelTop += 20
    }
    setPostion({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollLeft,
      width,
      height,
      labelLeft:left - containerLeft+width+container.scrollLeft,
      labelTop,
    });
  }
  //   创建一个挂载的容器
  const el = useMemo(() => {
    console.log('usememo重复渲染----------')
    // const el = document.createElement("div");
    // el.className = "wrapper";

    // const container = document.querySelector(`.${containerClassName}`);
    // container!.appendChild(el);
    const el = document.querySelector(`.${portalWrapperClassName}`)
    return el;
  }, []);
  const {components} = useComponentStore()
  useEffect(() => {
    updatePosition();
  }, [componentId,components]);
  const curComponent = useMemo(()=>{
    return getComponentById(componentId,components)
  },[componentId])
  return createPortal(
    <>
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        border: "1px dashed blue",
        pointerEvents: "none",
        width: position.width,
        height: position.height,
        zIndex: 12,
        borderRadius: 4,
        boxSizing: "border-box",
      }}
    />
    <div
        style={{
            position:'absolute',
            top:position.labelTop,
            left:position.labelLeft,
            fontSize:'14px',
            zIndex:'13',
            display:(!position.width||position.width<10)?'none':'inline',
            transform:'translate(-100%,-100%)',
        }}
    >
        <div
            style={{
                padding:'0 8px',
                backgroundColor:'blue',
                borderRadius:4,
                color:'#fff',
                cursor:'pointer',
                whiteSpace:'nowrap'
            }}
        >
            {curComponent?.desc}
        </div>
    </div>
    </>,
    el
  );
}
