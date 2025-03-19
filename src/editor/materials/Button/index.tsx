import { Button as AntdButton } from "antd";
import { componentCommonProps } from "../../interface";
export default function Button({type,text,id}:componentCommonProps) {
    return <AntdButton data-component-id={id} type={type}>{text}</AntdButton>
}