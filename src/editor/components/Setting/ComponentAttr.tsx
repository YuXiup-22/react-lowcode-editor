import { Form, Input, Select } from "antd";
import { useComponentStore } from "../../stores/components";
import {
  useComponentConfigStore,
  ComponentSetter,
  ComponentConfig
} from "../../stores/component-config";
import { useEffect } from "react";
export default function ComponentAttr() {
  const { curComponent, curComponentId, updateComponentProps } =
    useComponentStore();
  const { componentConfig } = useComponentConfigStore();
  const [form] = Form.useForm();
  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({
      ...data,
      ...curComponent?.props,
    });
  }, [curComponent]);
  function renderFormElement(setter: ComponentSetter) {
    if (setter.type === "input") {
      return <Input></Input>;
    } else if (setter.type === "select") {
      return <Select options={setter.options}></Select>;
    }
  }
  function valueChange(changeValues:ComponentConfig) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }
  if (!curComponent || !curComponentId) return null;

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      onValuesChange={valueChange}
    >
      <Form.Item label="组件id">
        <Input disabled value={curComponent?.id}></Input>
      </Form.Item>
      <Form.Item label="组件名称">
        <Input disabled value={curComponent?.name}></Input>
      </Form.Item>
      <Form.Item label="组件描述">
        <Input disabled value={curComponent?.desc}></Input>
      </Form.Item>
      {componentConfig[curComponent?.name]?.setter?.map((setter) => (
        <Form.Item label={setter.label} key={setter.name} name={setter.name}>
          {renderFormElement(setter)}
        </Form.Item>
      ))}
    </Form>
  );
}
