import { Button as AntdButton } from "antd";
import { componentCommonProps } from "../../../interface";
import { useDrag } from "react-dnd";
export default function Button({type,text,id,style}:componentCommonProps) {
    const [_,drag] = useDrag({
        type:'Button',
        item:{
            type:'Button',
            dragType:'move',
            id
        }

    })
    return <AntdButton ref={drag} data-component-id={id} style={style} type={type}>{text}</AntdButton>
}