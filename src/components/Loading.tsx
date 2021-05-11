import React from "react";

// Assets
import Logo from "../assets/logo.svg";

// Context
import { AppContext } from "../context/AppContext";

const Loading: React.FC = () => {
  const {
    state: { loading },
  } = React.useContext(AppContext);

  return (
    <div
      className="loading-wrapper"
      style={{
        display: loading ? "block" : "none",
      }}
    >
      <div className="inner">
        <img className="logo" src={Logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Loading;
