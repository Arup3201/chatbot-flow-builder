import { useCallback, useEffect } from "react";
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

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const nodes = JSON.parse(localStorage.getItem('nodes') || '[]')
    setNodes(nodes);

    const edges = JSON.parse(localStorage.getItem('edges') || '[]')
    setEdges(edges);
  }, [])

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
    if(nodes.length > 1) {
      // if not every node is part of atleast one edge
      if(!nodes.every(node => edges.find(ed => ed.source===node.id || ed.target===node.id))) {
        alert("Isolated edges are not allowed");
        return;
      }
    }

    localStorage.setItem('nodes', JSON.stringify(nodes));
    localStorage.setItem('edges', JSON.stringify(edges));
    alert("Flow saved");
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
