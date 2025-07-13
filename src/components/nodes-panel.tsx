import { useDraggable } from "@dnd-kit/core";
import { NODES } from "./nodes";
import type { PanelNodeProps } from "../types/panel-node";
import { cn } from "@/lib/utils";

const NodesPanel = () => {
  return (
    <div className="p-2 flex gap-2 flex-wrap border-2 border-l-gray-500">
      {NODES.map((nd) => (
        <DraggablePanelNode
          id={nd.id}
          type={nd.id}
          IconComponent={nd.IconComponent}
          title={nd.title}
        />
      ))}
    </div>
  );
};

const DraggablePanelNode = ({
  id,
  type,
  IconComponent,
  title,
}: PanelNodeProps) => {
  const { setNodeRef, attributes, listeners } = useDraggable({
    id,
    data: {
      type: type,
    },
  });

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="px-4 py-2 flex flex-col gap-2 items-center border-2 text-blue-800 border-blue-800 h-min cursor-pointer hover:bg-gray-100 rounded-md"
    >
      <IconComponent />
      {title}
    </div>
  );
};

const PanelNode = ({ IconComponent, title, overlay = false, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "px-4 py-2 flex flex-col gap-2 items-center border-2 text-blue-800 border-blue-800 h-min cursor-pointer hover:bg-gray-100 rounded-md",
        overlay ? "opacity-70 border-2" : ""
      )}
    >
      <IconComponent />
      {title}
    </div>
  );
};

export { PanelNode };
export default NodesPanel;
