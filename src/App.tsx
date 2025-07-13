import { act, useRef } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Button } from "./components/ui/button";
import FlowBuilder from "./components/flow-builder";
import NodesPanel, { PanelNode } from "./components/nodes-panel";
import { NODES } from "./components/nodes";

function App() {
  const draggingNode = useRef(null);

  function handleSaveFlow() {
    console.log("TODO");
  }

  const handleDragStart = ({ active }) => {
    draggingNode.current = active.id;
  };

  const trackNodePosition = ({ over }) => {
    console.log("Tracking: ", over);
  };

  const handleNodeDrop = ({ over }) => {
    console.log("Dropped: ", over);
    draggingNode.current = null;
  };

  const activePanelNode = NODES.find((nd) => nd.id === draggingNode.current);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={trackNodePosition}
      onDragEnd={handleNodeDrop}
    >
      <div className="flex flex-col gap-1">
        <header className="flex justify-end p-2 bg-gray-50">
          <Button onClick={() => handleSaveFlow()}>Save</Button>
        </header>
        <main className="flex">
          <FlowBuilder />
          <NodesPanel />
        </main>
      </div>
      <DragOverlay>
        {activePanelNode && (
          <PanelNode
            title={activePanelNode.title}
            IconComponent={activePanelNode.IconComponent}
            overlay={true}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
