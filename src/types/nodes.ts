type PanelNodeType = {
  id: string;
  IconComponent: React.ElementType
  title: string;
  component: React.ElementType
}

type MessageDataType = {
  message: string;
};

interface MessageNodeProps {
  data: MessageDataType;
  isConnectable: boolean;
}

export type { PanelNodeType, MessageDataType, MessageNodeProps };
