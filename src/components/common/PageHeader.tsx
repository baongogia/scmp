"use client";

import { Button, Typography, Space } from "antd";
import { ReactNode } from "react";

const { Title, Paragraph } = Typography;

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`mb-6 md:mb-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title
            level={1}
            className="text-gray-900 mb-2 text-lg md:text-2xl lg:text-3xl"
          >
            {title}
          </Title>
          {description && (
            <Paragraph className="text-gray-600 mb-0">{description}</Paragraph>
          )}
        </div>
        {actions && <Space>{actions}</Space>}
      </div>
    </div>
  );
}
