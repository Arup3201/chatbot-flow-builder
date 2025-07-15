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
      <div className="flex flex-col min-w-[200px] text-sm shadow-md rounded-md">
        <div className="flex items-center justify-between text-gray-800 font-medium bg-green-200 p-1 rounded-t-md px-2">
          <span className="flex items-center gap-2">
            <MessageCircleIcon size={14} />
            Send Message
          </span>
          <img src={"whatsapp.svg"} height={14} width={14} />
        </div>
        <div className="p-2 bg-white rounded-b-md text-sm text-gray-800">
          {data.message}
        </div>
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
    id: "message",
    title: "Message",
    data: {
      message: "Text message",
    },
    settings: [
      {
        field: "message",
        title: "Message",
        type: "text",
      },
    ],
    IconComponent: MessageCircle,
    component: MessageNode,
  },
];
const nodeTypes = {};
NODES.reduce((acc, cur) => (acc[cur.id] = cur.component), nodeTypes);

export { MessageNode, NODES, nodeTypes };
