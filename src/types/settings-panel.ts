import type { Node } from "@xyflow/react";
import type { SettingType } from "./nodes";

interface SettingsPanelProps {
  node: Node;
  settings: SettingType[] | undefined;
  onSave: (id: string, data: any, settings: SettingType[] | undefined) => void;
  onClose: () => void;
}

export type { SettingsPanelProps };
