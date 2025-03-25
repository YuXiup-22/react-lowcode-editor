import { componentCommonProps } from "../../../interface";
export default function Page({ children, id, name,style }: componentCommonProps) {
  return (
    <div
      className="h-[100%] p-[20px] box-border"
      style={{...style, }}
    >
      {children}
    </div>
  );
}
