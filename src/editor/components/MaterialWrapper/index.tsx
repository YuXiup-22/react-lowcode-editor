import { Segmented } from "antd";
import { useState } from "react";
import Material from "../Material";
import OutLine from "../Outline";
import Source from "../Source";
export default function MaterialWrapper(params:type) {
    const [value,setValue] = useState('物料')

    return (
        <div >
            <Segmented
                block
                options={['物料','大纲','源码']}
                value={value}
                onChange={setValue}
            ></Segmented>
            <div className="pt-[20px] h-[calc(100vh-60px-30px-20px)]">
            {
                value==='物料' && <Material></Material>

            }
            {
                value==='大纲' && <OutLine></OutLine>

            }
            {
                value==='源码' && <Source></Source>
            }
            </div>
        </div>
    )
}