import { Form, Input, Select } from "antd";
import { useComponentStore } from "../../stores/components";
import {
  useComponentConfigStore,
  ComponentSetter,
  ComponentConfig,
} from "../../stores/component-config";
import { CSSProperties, useEffect, useState } from "react";
import CssEditor from "./CssEditor";
import { debounce } from "lodash-es";
import styleToObject from "style-to-object";
export default function ComponentStyle() {
  const { curComponent, curComponentId, updateComponentStyle } =
    useComponentStore();
  const { componentConfig } = useComponentConfigStore();
  const [form] = Form.useForm();
  const [css,setCss] = useState('.comp{\n\n}')
  useEffect(() => {
    setCss(toCssStr(curComponent?.style || {}))
    form.resetFields()
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
    } else if (setter.type === "inputNumber") {
      return <Input type="number"></Input>;
    }
  }
  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      // 修改部分
      if (changeValues.width) {
        changeValues.width = changeValues.width + "px";
    }
    if (changeValues.height) {
        changeValues.height = changeValues.height + "px";
    }
        
      updateComponentStyle(curComponentId, changeValues);
    }
  }
  if (!curComponent || !curComponentId) return null;
  const handleEditorChange = debounce(val=>{
    setCss(val)
    // 将css json转为对象, 并更新
    const css :Record<string,any> = {}
    try {
        const cssStr = val.replace(/\/\*.*\*\//, '') // 去除注释
        .replace( /(\.?[^{]+{)/, ''). //去掉.comp{
        replace('}','') // 去掉}
        styleToObject(cssStr,(name,value)=>{
            // CSS 属性名从短横线分隔的形式转换为驼峰命名法
            css[name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))] = value;
        })
        updateComponentStyle(curComponentId,{...form.getFieldsValue(),...css},true)
    } catch (error) {
        console.log(error)
    }
  },500)
  function toCssStr(val:Record<string,any>) {
    let str = `.comp{\n`
    for(const key in val){
        let value = val[key]
        if(!value) continue
        if(['width','height'].includes(key) && !value.toString().endsWith('px')) {
            value += 'px'
        }
        str += `\t ${key}:${value};\n`
    }
    str += '}'
    return str
  }
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
      <div className="h-[200px] border-[1px] border-[#ccc]">
      <CssEditor
        value={css}
        onChange={handleEditorChange}
      ></CssEditor>
    </div>

    </Form>
  );
}
