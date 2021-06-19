import React from "react";
import { Button, Menu } from "semantic-ui-react";

const SignedOut = (props) => {
  const { signIn } = props;

  return (
    <div>
      <Menu.Item>
        <Button primary onClick={signIn}>
          Giriş Yap
        </Button>
        <Button primary style={{ marginLeft: "0.5em" }}>
          Kaydol
        </Button>
      </Menu.Item>
    </div>
  );
};

export default SignedOut;
