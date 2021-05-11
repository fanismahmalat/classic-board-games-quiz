import React from "react";

// Context
import { AppContext } from "../context/AppContext";

const Header: React.FC = () => {
  const {
    state: { pageTitle, pageDescription },
  } = React.useContext(AppContext);

  return (
    <header>
      <h1 id="page-title">{pageTitle}</h1>
      <p id="page-description">{pageDescription}</p>
    </header>
  );
};

export default Header;
