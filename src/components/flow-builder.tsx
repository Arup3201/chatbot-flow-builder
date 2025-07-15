import { useState } from "react";
import { useDroppable, DndContext, DragOverlay } from "@dnd-kit/core";
import {
  type Node,
  Background,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import NodesPanel, { PanelNode } from "./nodes-panel";
import { NODES, nodeTypes } from "./nodes";

const FlowBuilder = ({ onDrop, ...props }) => {
  const [draggingNodeType, setDraggingNodeType] = useState(null);
  const { screenToFlowPosition } = useReactFlow();

  const activePanelNode = NODES.find((nd) => nd.id === draggingNodeType);

  const handleDragStart = ({ active }) => {
    setDraggingNodeType(active.id);
  };

  const handleNodeDrop = ({ activatorEvent, over }) => {
    if (!over) return;

    const { clientX, clientY } = activatorEvent;

    console.log(clientX, clientY);

    const id = getId();
    const newNode: Node = {
      id,
      position: screenToFlowPosition({
        x: clientX,
        y: clientY,
      }),
      type: "message",
      data: { message: "text message" },
      origin: [0.5, 0.0],
    };

    onDrop(newNode);
    setDraggingNodeType(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleNodeDrop}>
      <Canvas {...props} />
      <NodesPanel />
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
};

let id = 1;
const getId = () => `${id++}`;

const Canvas = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect }) => {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <div
      className="wrapper"
      style={{ width: "80vw", height: "90vh" }}
      ref={setNodeRef}
    >
      <ReactFlow
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
