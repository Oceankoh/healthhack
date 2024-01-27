import React from "react";

export const Button = (): JSX.Element => {
  return (
    <button className="all-[unset] box-border relative w-[259px] h-[60px] bg-[#d9d9d9] rounded-[20px]">
      <div className="absolute w-[259px] h-[60px] -top-px left-0 [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[20px] text-center tracking-[0] leading-[normal]">
        Simplify
      </div>
    </button>
  );
};
