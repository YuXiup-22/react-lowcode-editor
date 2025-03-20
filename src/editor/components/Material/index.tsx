import { useMemo } from "react"
import { useComponentConfigStore } from "../../stores/component-config"
import MaterialItem from "../MaterialItem";
export default function Material() {
    const { componentConfig } = useComponentConfigStore()
    const components = useMemo(()=>{
        return Object.values(componentConfig)
    },[componentConfig])
    console.log(components)
    return <div>{ components.filter(item=>item.name!=='Page').map((component,index)=>{
        return <MaterialItem name={component.name} desc={component.desc} key={component.name+index}></MaterialItem>
    })
}</div>
}