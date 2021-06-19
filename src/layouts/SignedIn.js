import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";

const SignedIn = (props) => {
  const { signOut } = props;

  return (
    <div>
      <Menu.Item>
        <Image
          avatar
          spaced="right"
          src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4-300x300.png"
        />
        <Dropdown pointing="top left" text="Mustafa">
          <Dropdown.Menu>
            <Dropdown.Item text="Bilgilerim" icon="info" />
            <Dropdown.Item text="Çıkış Yap" icon="sign-out" onClick={signOut} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
};

export default SignedIn;
