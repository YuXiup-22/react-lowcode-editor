import { componentCommonProps } from "../../../interface";
import { Modal as AntdModal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
export interface ModalRef {
  open: () => void;
  close: () => void;
}
const Modal: React.ForwardRefRenderFunction<ModalRef, componentCommonProps> = (
  { style, title, children, onOk, onCancel },
  ref
) => {
  const [visible, setVisible] = useState(true);
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        setVisible(true);
      },
      close: () => {
        setVisible(false);
      },
    };
  });
  return (
    <AntdModal
      title={title}
      open={visible}
      onCancel={() => {
        // onCancel && onCancel();
        setVisible(false);
      }}
      onOk={() => {
        // onOk && onOk();
        setVisible(false);
      }}
      style={style}
    >
      {children}
    </AntdModal>
  );
};

export default forwardRef(Modal);
