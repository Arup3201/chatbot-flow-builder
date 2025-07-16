import { useCallback } from "react";
import {
  type Node,
  type Edge,
  type OnConnect,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  MarkerType,
} from "@xyflow/react";
import type { NodeDataType, SettingType } from "./types/nodes";
import { Button } from "./components/ui/button";
import FlowBuilder from "./components/flow-builder";
import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "0",
    type: "message",
    data: { text: "Text Message" },
    position: { x: 0, y: 50 },
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect: OnConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        // check if there is already an edge coming from this source
        const edge = eds.find((ed) => ed.source === params.source);
        if (edge) {
          alert('One node can"t have more than one source...');
          return eds;
        }

        // else add this edge
        return addEdge(
          {
            ...params,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        );
      }),
    []
  );

  function handleSaveFlow() {
    console.log("TODO");
  }

  function handleSettingsSave(
    nodeId: string,
    nodeData: NodeDataType,
    settings: SettingType[] | undefined
  ) {
    if(!settings) {
      alert("No configurations for this node to save");
      return;
    }

    setNodes((ndSnapshot) => {
      const newSnapshot = [...ndSnapshot];
      const nodeIndex = newSnapshot.findIndex((nd) => nd.id === nodeId);
      if (nodeIndex === -1) {
        alert("Node not registed in the store...");
        return newSnapshot;
      }

      const newData = {} as NodeDataType;
      settings.forEach(
        (setting) => (newData[setting.field] = nodeData[setting.field])
      );
      newSnapshot[nodeIndex] = {
        ...newSnapshot[nodeIndex],
        data: { ...newData },
      };
      return newSnapshot;
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <header className="flex justify-end p-2 bg-gray-50">
        <Button onClick={() => handleSaveFlow()}>Save</Button>
      </header>
      <main className="flex">
        <ReactFlowProvider>
          <FlowBuilder
            nodes={nodes}
            edges={edges}
            onDrop={(nd: Node) => setNodes((nds) => nds.concat(nd))}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSettingsSave={handleSettingsSave}
          />
        </ReactFlowProvider>
      </main>
    </div>
  );
}

export default App;
