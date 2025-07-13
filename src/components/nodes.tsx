import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { MessageSquareIcon, MessageCircle } from "lucide-react";
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
      <div className="message-node">
        <div className="message-head">
          <span>
            <MessageSquareIcon size={24} />
            Send Message
          </span>
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
