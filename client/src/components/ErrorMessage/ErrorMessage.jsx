import React from "react";
import { Result, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import "./ErrorMessage.css";

const { Paragraph, Text } = Typography;

export default function ErrorMessage({ error }) {
  return (
    <Result status="error" title="Something went wrong">
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            Error details:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined style={{ marginRight: 8 }} />
          {error.message}
        </Paragraph>
      </div>
    </Result>
  );
}
