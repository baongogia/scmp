"use client";

import { Button, Space, Tooltip } from "antd";
import { ReactNode } from "react";

export interface ActionButton {
  key: string;
  icon?: ReactNode;
  label?: string;
  tooltip?: string;
  type?: "primary" | "default" | "dashed" | "link" | "text";
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface ActionButtonsProps {
  actions: ActionButton[];
  size?: "small" | "middle" | "large";
  className?: string;
}

export function ActionButtons({
  actions,
  size = "small",
  className = "",
}: ActionButtonsProps) {
  return (
    <Space className={className}>
      {actions.map((action) => {
        const button = (
          <Button
            key={action.key}
            type={action.type}
            size={size}
            icon={action.icon}
            danger={action.danger}
            disabled={action.disabled}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        );

        return action.tooltip ? (
          <Tooltip key={action.key} title={action.tooltip}>
            {button}
          </Tooltip>
        ) : (
          button
        );
      })}
    </Space>
  );
}
