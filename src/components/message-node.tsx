import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { MessageSquareIcon } from "lucide-react";

type NodeData = {
  label: string
}

interface MessageNodeProps {
  data: NodeData, 
  isConnectable: boolean
}

export default memo(({ data, isConnectable }: MessageNodeProps) => {
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
        <div className="message-body">
            {data.label}
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
