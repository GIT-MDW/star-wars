import React from "react";
import { Modal, Typography, Spin } from "antd";
import type { ReactNode } from "react";

const { Title } = Typography;

interface ResourceModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number;
  loading?: boolean;
  loadingText?: string;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  title,
  open,
  onClose,
  children,
  width = 700,
  loading = false,
  loadingText = "Loading...",
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={width}
      centered
      title={
        <Title level={3} style={{ margin: 0 }}>
          {title}
        </Title>
      }
    >
      <div style={{ padding: "16px 0" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Spin size="large" tip={loadingText} />
          </div>
        ) : (
          children
        )}
      </div>
    </Modal>
  );
};
