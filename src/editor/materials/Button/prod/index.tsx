import { Button as AntdButton } from "antd";
import { componentCommonProps } from "../../../interface";
export default function Button({
  type,
  text,
  id,
  style,
  ...props //绑定的方法
}: componentCommonProps) {
  return (
    <AntdButton  style={style} type={type} {...props}>
      {text}
    </AntdButton>
  );
}
