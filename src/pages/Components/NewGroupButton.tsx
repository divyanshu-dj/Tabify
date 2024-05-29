import React from "react";

interface NewGroupButtonProps {
  handleClick: () => void;
}

export const NewGroupButton: React.FC<NewGroupButtonProps> = ({ handleClick }) => {
  return (
    <button 
      className="w-full bg-black text-white rounded-full py-2 text-base font-semibold"
      onClick={handleClick}
    >
      New Group
    </button>
  );
}


