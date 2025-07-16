import type { NodeProps } from "@xyflow/react";

type MessageDataType = {
  text: string;
};
type NodeDataType = MessageDataType; // more node data types can be added

type SettingType = {
  field: keyof NodeDataType;
  title: string;
  type: "text" | "number";
};

interface MessageNodeProps extends NodeProps {
  data: MessageDataType;
  isConnectable: boolean;
}

type PanelNodeType = {
  id: string;
  IconComponent: React.ElementType;
  title: string;
  settings: SettingType[];
  data: MessageDataType;
  component: React.ComponentType<MessageNodeProps>;
};

export type {
  SettingType,
  NodeDataType,
  PanelNodeType,
  MessageDataType,
  MessageNodeProps,
};
