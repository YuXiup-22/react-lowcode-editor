import { Button as AntdButton } from "antd";
import { componentCommonProps } from "../../../interface";
export default function Button({type,text,id,style}:componentCommonProps) {
    return <AntdButton data-component-id={id} style={style} type={type}>{text}</AntdButton>
}