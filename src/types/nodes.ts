type MessageDataType = {
  text: string;
};
type NodeDataType = MessageDataType;

type SettingType = {
  field: keyof NodeDataType;
  title: string;
  type: "text" | "number";
};

type PanelNodeType = {
  id: string;
  IconComponent: React.ElementType;
  title: string;
  settings: SettingType[];
  data: MessageDataType;
  component: React.ElementType;
};

interface MessageNodeProps {
  data: MessageDataType;
  isConnectable: boolean;
}

export type {
  SettingType,
  NodeDataType,
  PanelNodeType,
  MessageDataType,
  MessageNodeProps,
};
