import { useCallback } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  type Node,
  type Edge,
  type OnConnect,
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { nodeTypes } from "./nodes";

const initialNodes: Node[] = [
  {
    id: "0",
    type: "message",
    data: { message: "Text Message" },
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;

const ConnectNodes = () => {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  const [nodes, _, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // const onConnectEnd: OnConnectEnd = useCallback(
  //   (event, connectionState) => {
  //     // when a connection is dropped on the pane it's not valid
  //     if (!connectionState.isValid) {
  //       // we need to remove the wrapper bounds, in order to get the correct position
  //       const id = getId();
  //       const { clientX, clientY } =
  //         "changedTouches" in event ? event.changedTouches[0] : event;
  //       const newNode: Node = {
  //         id,
  //         position: screenToFlowPosition({
  //           x: clientX,
  //           y: clientY,
  //         }),
  //         data: { label: `Node ${id}` },
  //         origin: [0.5, 0.0],
  //       };

  //       setNodes((nds) => nds.concat(newNode));
  //       setEdges((eds) =>
  //         eds.concat({ id, source: connectionState.fromNode.id, target: id })
  //       );
  //     }
  //   },
  //   [screenToFlowPosition]
  // );

  return (
    <div
      className="wrapper"
      style={{ width: "80vw", height: "90vh" }}
      ref={setNodeRef}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 2 }}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <ConnectNodes />
  </ReactFlowProvider>
);
