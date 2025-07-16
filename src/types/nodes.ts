type SettingType = {
  field: string;
  title: string;
  type: "text" | "number";
};

type MessageDataType = {
  text: string;
}

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

export type { SettingType, PanelNodeType, MessageDataType, MessageNodeProps };
