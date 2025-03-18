import { Allotment } from "allotment";
import "allotment/dist/style.css";
import EditorArea from "./components/EditArea";
import Setting from "./components/Setting";
import Material from "./components/Material";
import Header from "./components/Header";
function LowcodeEditor() {
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="h-[60px] flex items-center border-b-[1px] border-[#000]">
        <Header/>
      </div>
      <Allotment>
        <Allotment.Pane preferredSize={240} minSize={200} maxSize={300}>
          <Material></Material>
        </Allotment.Pane>
        <Allotment.Pane>
            <EditorArea></EditorArea>
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} minSize={300} maxSize={500}>
          <Setting></Setting>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default LowcodeEditor;
