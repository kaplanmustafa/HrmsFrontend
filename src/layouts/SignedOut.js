import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

const SignedOut = (props) => {
  const { signIn } = props;

  return (
    <div>
      <Menu.Item>
        <Button primary onClick={signIn}>
          Giriş Yap
        </Button>
        <Button
          as={NavLink}
          to="/signup"
          primary
          style={{ marginLeft: "0.5em" }}
        >
          Kaydol
        </Button>
      </Menu.Item>
    </div>
  );
};

export default SignedOut;
