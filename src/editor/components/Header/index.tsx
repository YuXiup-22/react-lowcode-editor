import { Button } from "antd";
import { useComponentStore } from "../../stores/components";

export default function Header() {
    const {setMode,mode,setCurComponentId} = useComponentStore()
    return <div className="w-[100%] flex justify-between pl-[9px] pr-[9px]">
        <p>低代码编辑器</p>
        {
            mode==='dev'&&<Button type="primary" onClick={()=>setMode('prod')}>预览</Button>
        }
        {
            mode==='prod'&&<Button type="primary" onClick={()=>{
                setMode('dev')
                setCurComponentId(null)
            }}>退出预览</Button>
        }
    </div>
    
}