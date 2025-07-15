import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { MessageCircleIcon, MessageCircle } from "lucide-react";
import type { MessageNodeProps, PanelNodeType } from "../types/nodes";

const MessageNode = memo(({ data, isConnectable }: MessageNodeProps) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className="flex flex-col text-sm border-1 border-gray-500">
        <div className="flex items-center text-gray-200 gap-1 bg-green-800 p-1">
            <MessageCircleIcon size={12} />
            Send Message
        </div>
        <div className="message-body">{data.message}</div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
});


// Add the node type to register it on the react flow builder
const NODES: PanelNodeType[] = [
  {
    id: 'message', 
    title: 'Message', 
    IconComponent: MessageCircle, 
    component: MessageNode
  }
]
const nodeTypes = {}
NODES.reduce((acc, cur) => acc[cur.id] = cur.component, nodeTypes)

export { MessageNode, NODES,  nodeTypes };
