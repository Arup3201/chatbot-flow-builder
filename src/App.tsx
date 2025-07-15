import { useCallback } from "react";
import {
  type Node,
  type Edge,
  type OnConnect,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "@xyflow/react";
import { Button } from "./components/ui/button";
import FlowBuilder from "./components/flow-builder";
import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "0",
    type: "message",
    data: { message: "Text Message" },
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
        return addEdge(params, eds);
      }),
    []
  );

  function handleSaveFlow() {
    console.log("TODO");
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
            onDrop={(nd) => setNodes((nds) => nds.concat(nd))}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />
        </ReactFlowProvider>
      </main>
    </div>
  );
}

export default App;
