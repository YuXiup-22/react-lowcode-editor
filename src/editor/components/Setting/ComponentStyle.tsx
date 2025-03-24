import { Form, Input, Select } from "antd";
import { useComponentStore } from "../../stores/components";
import {
  useComponentConfigStore,
  ComponentSetter,
  ComponentConfig
} from "../../stores/component-config";
import { CSSProperties, useEffect } from "react";
export default function ComponentStyle() {
  const { curComponent, curComponentId, updateComponentStyle } =
    useComponentStore();
  const { componentConfig } = useComponentConfigStore();
  const [form] = Form.useForm();
  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({
      ...data,
      ...curComponent?.style,
    });
  }, [curComponent]);
  function renderFormElement(setter: ComponentSetter) {
    if (setter.type === "input") {
      return <Input></Input>;
    } else if (setter.type === "select") {
      return <Select options={setter.options}></Select>;
    }else if(setter.type === 'inputNumber'){
      return <Input type='number'></Input>
    }
  }
  function valueChange(changeValues:CSSProperties) {
    console.log(changeValues);
    if (curComponentId) {
        changeValues.width +='px'
        changeValues.height +='px'
        updateComponentStyle(curComponentId, changeValues);
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
      {componentConfig[curComponent?.name]?.styleSetter?.map((setter) => (
        <Form.Item label={setter.label} key={setter.name} name={setter.name}>
          {renderFormElement(setter)}
        </Form.Item>
      ))}
    </Form>
  );
}
