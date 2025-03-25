import { componentCommonProps } from "../../../interface";
export default function Container({ children, id, name,style }: componentCommonProps) {
  return (
    <div
      style={style}
      className={`border-[1px]    min-h-[100px] p-[20px]`}
    >
      {children}
    </div>
  );
}
