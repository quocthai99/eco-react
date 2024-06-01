import React from "react";

const ExtraInfo = ({ icon, title, info }) => {
  return (
    <div className="flex items-center gap-[10px] border p-[10px] min-w-[240px]">
      <span className="w-8 h-8 rounded-full bg-[#505050] text-white flex items-center justify-center">
        {icon}
      </span>

      <div className="flex flex-col">
        <span>{title}</span>
        <span className="text-xs text-[#505050]">{info}</span>
      </div>
    </div>
  );
};

export default ExtraInfo;
