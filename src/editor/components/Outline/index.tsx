import { Tree } from "antd";
import { useComponentStore } from "../../stores/components";
export default function OutLine(params:type) {
    const { components,setCurComponentId } = useComponentStore()
    console.log(components)
    return <Tree
        treeData={components}
        fieldNames={{
            title: "desc",
            children: "children",
            key: "id",
        }}
        showLine
        defaultExpandAll
        onSelect={([selectedKeys])=>{
            setCurComponentId(selectedKeys as number)
        }}
    ></Tree>
    
}