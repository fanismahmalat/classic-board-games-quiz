import React from "react";

// Components
import Button from "./Button";

// Helpers
import useButtonClick from "../hooks/useButtonClick";

import { AppContext } from "../context/AppContext";

export const Nav: React.FC = () => {
  const {
    state: { message },
  } = React.useContext(AppContext);

  const messageRef = React.useRef<HTMLSpanElement>(null);
  const handleClick = useButtonClick(messageRef);

  return (
    <div className="nav">
      <span ref={messageRef} className="message">
        {message}
      </span>
      <Button cb={handleClick} />
    </div>
  );
};

export default Nav;
