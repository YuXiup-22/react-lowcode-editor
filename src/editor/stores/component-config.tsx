/**
 * component名字和instance的映射
 * 这里后续可以考虑自动化收集
 */

import { create } from "zustand"
import Container from "../materials/Container"
import Button from "../materials/Button"
import Page from "../materials/Page"

// 可配置的属性
export interface ComponentSetter{
    name:string,
    label:string,
    type:string,
    [key:string]:any
}
export interface ComponentConfig{
    name:string,
    defaultProps:Record<string,any>,
    component:any,
    desc:string,
    setter?:ComponentSetter[]
    styleSetter?:ComponentSetter[]
}

interface State{
    componentConfig:{
        [key:string]:ComponentConfig
    }
}


interface Action{
    registerComponent:(name:string,componentConfig:ComponentConfig)=>void
}

export const useComponentConfigStore = create<State&Action>((set)=>(
    {
        componentConfig:{
            Container:{
                name:'Container',
                defaultProps:{},
                component:Container,
                desc:'容器'
            },
            Button:{
                name:'Button',
                defaultProps:{
                    type:'primary',
                    text:'按钮'
                },
                component:Button,
                desc:'按钮',
                setter:[
                    {
                        name:'type',
                        label:'按钮类型',
                        type:'select',
                        options:[
                            {
                                label:'primary',
                                value:'primary'
                            },
                            {
                                label:'danger',
                                value:'danger'
                            }
                        ]
                    },{
                        name:'text',
                        label:'按钮文本',
                        type:'input'
                    }
                ],
                styleSetter:[
                    {
                        name:'width',
                        label:'宽度',
                        type:'inputNumber'
                    },{
                        name:'height',
                        label:'高度',
                        type:'inputNumber'
                    }
                ]
            },
            Page:{
                name:'Page',
                defaultProps:{},
                component:Page,
                desc:'页面'
            }
        },
        registerComponent:(name,compopentConfig)=>set(state=>{
            return {
                ...state,
                componentConfig:{
                    ...state.componentConfig,
                    [name]:compopentConfig
                }
            }
        }),
    }
))