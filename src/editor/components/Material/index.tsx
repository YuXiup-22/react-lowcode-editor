import { useMemo } from "react"
import { useComponentConfigStore } from "../../stores/component-config"
import MaterialItem from "../MaterialItem";
export default function Material() {
    const { componentConfig } = useComponentConfigStore()
    const components = useMemo(()=>{
        return Object.values(componentConfig)
    },[componentConfig])
    return <div>{ components.map((component,index)=>{
        return <MaterialItem name={component.name} key={component.name+index}></MaterialItem>
    })
}</div>
}