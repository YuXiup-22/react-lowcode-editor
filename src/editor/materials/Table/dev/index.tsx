import { Table as AntdTable } from "antd";
import { componentCommonProps } from "../../../interface";
import { useMaterialDrop } from "../../../hooks/useMaterialDrop";
import React, { useEffect, useMemo, useRef } from "react";
import { useDrag } from "react-dnd";
export default function Table({id,style,name,children}:componentCommonProps) {
    const divRef = useRef<HTMLDivElement>(null)
    const {drop,canDrop} =  useMaterialDrop(['TableColumn'],id)
    const [_,drag] = useDrag({
        type:'Table',
        item:{
            type:'Table',
            dragType:'move',
            id
        }
    })
    const columns = useMemo(()=>{
        return React.Children.map(children,(item:any)=>{
            return {
                key:item,
                title:<div className="m-[-16px] p-[16px]" data-component-id={item.props?.id} >{item.props?.title}</div>,
                dataIndex:item.props.dataIndex,
            }
        })
    },[children])
    useEffect(()=>{
        drag(divRef.current)
        drop(divRef.current)
    },[])
    return (
        <div ref={divRef} data-component-id={id} style={style} 
            className={`w-[100%] ${canDrop?'border-[2px] border-[blue]':'border-[1px] border-[#000]'}`}
        >
           <AntdTable
           dataSource={[]}
           pagination={false}
           columns={columns}
           ></AntdTable> 
        </div>
    )
    
}