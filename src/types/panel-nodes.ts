interface DraggablePanelNodeProps {
  id: string;
  type: string;
  IconComponent: React.ElementType, 
  title: string;
}

interface PanelNodeProps {
  IconComponent: React.ElementType, 
  title: string, 
  overlay: boolean
}

export type { DraggablePanelNodeProps, PanelNodeProps };
