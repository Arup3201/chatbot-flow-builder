import type {
  Edge,
  Node,
  NodeMouseHandler,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "@xyflow/react";
import type { NodeDataType, SettingType } from "./nodes";

interface BaseProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
}

interface FlowBuilderProps extends BaseProps {
  onDrop: (node: Node) => void;
  onSettingsSave: (
    id: string,
    data: NodeDataType,
    settings: SettingType[] | undefined
  ) => void;
}

interface CanvasProps extends BaseProps {
  onNodeClick: NodeMouseHandler;
}

export type { FlowBuilderProps, CanvasProps };
