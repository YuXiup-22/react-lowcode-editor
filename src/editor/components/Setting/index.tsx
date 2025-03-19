import { useComponentStore } from "../../stores/components"


export default function Setting(params:type) {
    const {components} = useComponentStore()
    return <div><pre>
        {JSON.stringify(components,null,2)}
        </pre></div>
    
}