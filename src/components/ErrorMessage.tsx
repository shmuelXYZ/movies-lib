import React from "react";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p className="error">
      <span>💔</span>
      {message}
    </p>
  );
};
