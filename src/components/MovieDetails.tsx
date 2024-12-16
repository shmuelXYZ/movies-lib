import React from "react";

interface MovieDetailsProps {
  selectedId: string;
  onClose: () => void;
}

export const MovieDetails = ({ selectedId, onClose }: MovieDetailsProps) => {
  return (
    <div className="details">
      <button className="btn-back" onClick={() => onClose()}>
        &larr;
      </button>
      {selectedId}
    </div>
  );
};
