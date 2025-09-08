"use client";

import { Card, Typography, Row, Col } from "antd";
import { ReactNode } from "react";

const { Title, Text } = Typography;

export interface StatItem {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative";
  icon: ReactNode;
}

interface StatsCardsProps {
  stats: StatItem[];
  className?: string;
}

export function StatsCards({ stats, className = "" }: StatsCardsProps) {
  return (
    <Row gutter={[16, 16]} className={`mb-6 ${className}`}>
      {stats.map((stat, index) => (
        <Col xs={12} sm={12} md={6} lg={6} key={index}>
          <Card className="h-full">
            <div className="flex items-center justify-between mb-4">
              <Title level={5} className="text-sm font-medium mb-0">
                {stat.title}
              </Title>
              <div className="text-blue-600">{stat.icon}</div>
            </div>
            <div className="text-2xl font-bold mb-2">{stat.value}</div>
            {stat.change && (
              <Text className="text-xs text-gray-500">
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stat.change}
                </span>{" "}
                so với tháng trước
              </Text>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
}
