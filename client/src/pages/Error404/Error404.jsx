import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

export const Error404 = () => {
  const history = useHistory();

  const onBackHomeClick = () => {
    history.push("/");
  };

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={onBackHomeClick}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};
