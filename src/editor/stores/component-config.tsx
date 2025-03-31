/**
 * component名字和instance的映射
 * 这里后续可以考虑自动化收集
 */

import { create } from "zustand";
import Container from "../materials/Container/dev";
import Button from "../materials/Button/dev";
import Page from "../materials/Page/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonProd from "../materials/Button/prod";
import PageProd from "../materials/Page/prod";
import ModalDev from "../materials/Modal/dev";
import ModalProd from "../materials/Modal/prod";
// 可配置的属性
export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}
export interface ComponentEvent {
  name: string;
  label: string;
}
export interface ComponentMethod {
  name: string;
  label: string;
}
export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component?: any;
  desc: string;
  setter?: ComponentSetter[];
  styleSetter?: ComponentSetter[];
  events?: ComponentEvent[];
  methods:ComponentMethod[]
  dev: any;
  prod: any;
}

interface State {
  componentConfig: {
    [key: string]: ComponentConfig;
  };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      component: Container,
      desc: "容器",
      dev: Container,
      prod: ContainerProd,
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      component: Button,
      desc: "按钮",
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            {
              label: "primary",
              value: "primary",
            },
            {
              label: "danger",
              value: "danger",
            },
          ],
        },
        {
          name: "text",
          label: "按钮文本",
          type: "input",
        },
      ],
      styleSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
      ],
      events: [
        {
          name: "onClick",
          label: "点击事件",
        },
        {
          name: "onDoubleClick",
          label: "双击事件",
        },
      ],
      dev: Button,
      prod: ButtonProd,
    },
    Page: {
      name: "Page",
      defaultProps: {},
      component: Page,
      desc: "页面",
      dev: Page,
      prod: PageProd,
    },
    Modal: {
      name: "Modal",
      defaultProps: {
        title: "弹窗",
      },
      events: [
        {
          name: "onOk",
          label: "确定事件 ",
        },
        {
          name: "onCancel",
          label: "取消事件 ",
        },
      ],
      methods: [
        {
          name: "open",
          label: "打开弹窗",
        },
        {
          name: "close",
          label: "关闭弹窗",
        },
      ],
      setter: [
        {
          name: "title",
          label: "标题",
          type: "input",
        },
      ],
      styleSetter: [],
      desc: "弹窗",
      dev: ModalDev,
      prod: ModalProd,
    },
  },
  registerComponent: (name, compopentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: compopentConfig,
        },
      };
    }),
}));
