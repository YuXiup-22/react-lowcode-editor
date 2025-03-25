import { useEffect, useState, useMemo } from "react";
import { useComponentStore,getComponentById } from "../../stores/components";
import { createPortal } from "react-dom";
import { Dropdown, Popconfirm, Space, } from "antd";
import { DeleteOutlined  } from "@ant-design/icons";
interface ClickMaskProps {
  componentId: number;
  portalWrapperClassName: string;
  containerClassName: string;
}

export default function ClickMask({
  componentId,
  portalWrapperClassName,
  containerClassName,
}: ClickMaskProps) {
  const { curComponentId, components,deleteComponent,setCurComponentId } = useComponentStore();
  const [position, setPostion] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });
  function updatePosition() {
    // 获取挂载的dom
    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;
    //   获取蒙层的位置，即需要添加mask的元素
    const target = document.querySelector(
      `[data-component-id='${componentId}']`
    );
    if (!target) return;
    const { left, top, width, height } = target.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();
    // 计算mask相对于container,scrolltop加上才是在盒子里的真实距离
    let labelTop = top - containerTop + container.scrollTop;
    if (labelTop <= 0) {
      labelTop += 20;
    }
    setPostion({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollLeft,
      width,
      height,
      labelLeft: left - containerLeft + width + container.scrollLeft,
      labelTop,
    });
  }
  useEffect(()=>{
    const resizeHandler = ()=>{
      updatePosition()
    }
    window.addEventListener('resize',resizeHandler)
    return ()=>{
      window.removeEventListener('resize',resizeHandler)
    }
  },[])
  useEffect(() => {
    updatePosition();
  }, [componentId]);
  useEffect(() => {
    setTimeout(()=>{
      updatePosition()
    },200)
  }, [components]);
  //   创建一个挂载的容器
  const el = useMemo(() => {
    const el = document.querySelector(`.${portalWrapperClassName}`);
    return el;
  }, []);
  const curComponent = useMemo(()=>{
    return getComponentById(componentId,components)
  },[componentId])
  function handleDelete() {
    deleteComponent(curComponentId!)
    setCurComponentId(null)
  }
  const parentComponents = useMemo(() => {
    const parentComponents = [];
    let component = curComponent;
    while (component?.parentId) {
      component = getComponentById(component.parentId, components)!;
      parentComponents.push(component);
    }
    return parentComponents;
  }, [curComponent]);
  console.log(parentComponents)
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
          position: "absolute",
          top: position.labelTop,
          left: position.labelLeft,
          fontSize: "14px",
          zIndex: "13",
          display: !position.width || position.width < 10 ? "none" : "inline",
          transform: "translate(-100%,-100%)",
        }}
      >
        <Space>
          <Dropdown
            menu={{
              onClick:({key})=>{
                setCurComponentId(+key)
              },
              items:parentComponents.map(item=>({
                key:item.id,
                label:item.desc
              }))
            }}
            
          >
        <div
          style={{
            padding: "0 8px",
            backgroundColor: "blue",
            borderRadius: 4,
            color: "#fff",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {curComponent?.desc}
        </div>
        </Dropdown>
        {
          curComponentId!==1&&(
            <div style={{ padding: '0 8px', backgroundColor: 'blue' }}>
              <Popconfirm
              title='删除组件'
              description='确定要删除该组件吗？'
              okText='Yes'
              cancelText='No'
              onConfirm={handleDelete}
              >
                <DeleteOutlined style={{ color: '#fff' }}></DeleteOutlined>
              </Popconfirm>
            </div>
          )
        }
        </Space>
      </div>
    </>,
    el
  );
}
