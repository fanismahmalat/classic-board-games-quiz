import React from "react";

interface ButtonProps {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ cb }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    cb(e);
  };

  return (
    <button className="btn" onClick={handleClick}>
      Continue
    </button>
  );
};

export default Button;
