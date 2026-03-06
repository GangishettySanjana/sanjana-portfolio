import React from "react";

function Button({
  label = "Click me",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {label}
    </button>
  );
}

export default Button;
