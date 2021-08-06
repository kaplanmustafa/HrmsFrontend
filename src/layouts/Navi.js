import React, { useState } from "react";
import { Container, Menu } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import { useHistory, Link } from "react-router-dom";

const Navi = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const history = useHistory();

  const handleSignOut = (params) => {};

  const handleSignIn = (params) => {
    history.push("/login");
  };

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item>
            <Link to="/">Ana Sayfa</Link>
          </Menu.Item>
          <Menu.Item name="messages">
            <Link to="/newJobPosting">Yeni İlan</Link>
          </Menu.Item>

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
