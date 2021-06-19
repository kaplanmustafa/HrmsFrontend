import React, { useState } from "react";
import { Container, Menu } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import { useHistory, Link } from "react-router-dom";

const Navi = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const history = useHistory();

  const handleSignOut = (params) => {
    setIsAuthenticated(false);
    history.push("/");
  };

  const handleSignIn = (params) => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item name="messages" />

          <Menu.Menu position="right">
            {isAuthenticated ? (
              <SignedIn signOut={handleSignOut} />
            ) : (
              <SignedOut signIn={handleSignIn} />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
};

export default Navi;
