import React from "react";
import { Link } from "react-router-dom";
import { Header } from "semantic-ui-react";

const GeneralLoginPage = () => {
  return (
    <div
      style={{
        marginTop: "5rem",
        width: "75%",
        textAlign: "center",
        display: "inline-block",
      }}
    >
      <Header
        as="h1"
        color="teal"
        textAlign="center"
        style={{ marginBottom: "3rem" }}
      >
        GİRİŞ YAP
      </Header>
      <div className="ui two column grid">
        <div className="column">
          <Link to="/employee/login">
            <div className="ui fluid card">
              <div className="image">
                <img
                  src="https://semantic-ui.com/images/avatar2/large/matthew.png"
                  alt="employee"
                />
              </div>
              <div className="content">
                <div className="header">İş Arayan</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="column">
          <Link to="/employer/login">
            <div className="ui fluid card">
              <div className="image">
                <img
                  src="https://semantic-ui.com/images/avatar2/large/molly.png"
                  alt="employer"
                />
              </div>
              <div className="content">
                <div className="header">İşveren</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GeneralLoginPage;
