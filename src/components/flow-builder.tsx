import { useState } from "react";
import { useDroppable, DndContext, DragOverlay } from "@dnd-kit/core";
import { type Node, Background, ReactFlow, useReactFlow } from "@xyflow/react";
import NodesPanel, { PanelNode } from "./nodes-panel";
import { NODES, nodeTypes } from "./nodes";
import SettingsPanel from "./settings-panel";

const FlowBuilder = ({ onDrop, onSettingsSave, ...props }) => {
  const [draggingNodeType, setDraggingNodeType] = useState(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  const activePanelNode = NODES.find((nd) => nd.id === draggingNodeType);

  const handleDragStart = ({ active }) => {
    setDraggingNodeType(active.id);
  };

  const handleNodeDrop = (event) => {
    const { over } = event;

    if (!over) return;

    if (!activePanelNode) {
      alert("Invalid node type...");
      return;
    }

    const pointerPosition = event.activatorEvent || event.pointerPosition;

    const id = getId();
    const newNode: Node = {
      id,
      position: screenToFlowPosition({
        x: pointerPosition.pageX,
        y: pointerPosition.pageY,
      }),
      type: activePanelNode.id,
      data: activePanelNode.data,
      origin: [0.5, 0.0],
    };

    onDrop(newNode);
    setDraggingNodeType(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleNodeDrop}>
      <Canvas
        {...props}
        onNodeClick={(_, node) => setSelectedNode(node)}
      />
      {selectedNode ? (
        <SettingsPanel
          node={selectedNode}
          settings={NODES.find((node) => node.id === selectedNode.type)?.settings}
          onClose={() => setSelectedNode(null)}
          onSave={onSettingsSave}
        />
      ) : (
        <NodesPanel />
      )}
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

const Canvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
}) => {
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
        onNodeClick={onNodeClick}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
