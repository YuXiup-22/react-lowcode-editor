import { Allotment } from "allotment";
import "allotment/dist/style.css";
import EditorArea from "./components/EditArea";
import Setting from "./components/Setting";
import Material from "./components/Material";
import Header from "./components/Header";
import MaterialWrapper from "./components/MaterialWrapper";
import { useComponentStore } from "./stores/components";
import Preview from "../editor/components/Preview";
function LowcodeEditor() {
  const {mode}  = useComponentStore()
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="h-[60px] flex items-center border-b-[1px] border-[#000]">
        <Header/>
      </div>
      {
        mode==='dev'?<Allotment>
        <Allotment.Pane preferredSize={240} minSize={200} maxSize={300}>
          <MaterialWrapper></MaterialWrapper>
        </Allotment.Pane>
        <Allotment.Pane>
            <EditorArea></EditorArea>
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} minSize={300} maxSize={500}>
          <Setting></Setting>
        </Allotment.Pane>
      </Allotment>:<Preview></Preview>
      }
      
    </div>
  );
}

export default LowcodeEditor;
