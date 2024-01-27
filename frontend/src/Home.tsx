import React from "react";
import { Button } from "./components/Button";

export const Home = (): JSX.Element => {
  return (
    <div className="bg-[#f0f0f0] flex flex-row justify-center w-full">
      <div className="bg-[#f0f0f0] w-[1512px] h-[982px] relative">
        <div className="absolute w-[394px] h-[436px] top-[355px] left-[905px] bg-neutral-100 rounded-[20px] shadow-[0px_4px_4px_#00000040]">
          <p className="absolute w-[353px] top-[20px] left-[18px] [font-family:'Inter-Regular',Helvetica] font-normal text-neutral-950 text-[18px] tracking-[0] leading-[24px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat metus rutrum sollicitudin
            luctus. Mauris in dui at ex convallis mollis vel eu magna. Sed accumsan, sem id vehicula consectetur, nulla
            mi commodo leo, id rhoncus velit nulla a odio.
          </p>
        </div>
        <div className="w-[394px] h-[137px] top-[157px] left-[905px] shadow-[0px_4px_4px_#00000040] absolute bg-neutral-100 rounded-[20px]" />
        <div className="absolute w-[555px] h-[546px] top-[157px] left-[150px] bg-neutral-100 rounded-[20px] shadow-[0px_4px_4px_#00000040]">
          <p className="absolute w-[518px] top-[21px] left-[18px] [font-family:'Inter-Regular',Helvetica] font-normal text-neutral-950 text-[18px] tracking-[0] leading-[24px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat metus rutrum sollicitudin
            luctus. Mauris in dui at ex convallis mollis vel eu magna. Sed accumsan, sem id vehicula consectetur, nulla
            mi commodo leo, id rhoncus velit nulla a odio. Morbi tellus orci, egestas id velit at, dictum pretium dui.
            Proin malesuada eleifend sapien, at luctus dui varius sit amet. Maecenas eget interdum velit. Duis bibendum
            nisl et porttitor vehicula. Donec vitae ex nisl. Mauris porttitor vulputate nulla at viverra. Vivamus eu
            elit sed ligula eleifend pretium. Proin consectetur augue lacus, eget tempor metus pharetra eget. Aenean
            gravida consectetur aliquet.
          </p>
        </div>
        <Button
        //   className="!shadow-[0px_4px_4px_#00000040] !absolute !left-[446px] !bg-neutral-100 !top-[719px]"
        //   divClassName="!text-neutral-950"
        />
        <Button
        //   className="!shadow-[0px_4px_4px_#00000040] !absolute !left-[150px] !bg-neutral-100 !top-[719px]"
        //   divClassName="!text-neutral-950"
        //   text="Elaborate"
        />
        <div className="absolute h-[29px] top-[110px] left-[909px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inter-Bold',Helvetica] font-bold text-neutral-950 text-[24px] text-center tracking-[0] leading-[normal]">
          Upload Medical Report
        </div>
        <div className="absolute w-[189px] h-[29px] top-[110px] left-[156px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inter-Bold',Helvetica] font-bold text-neutral-950 text-[24px] tracking-[0] leading-[normal]">
          Project Title
        </div>
        <div className="absolute h-[29px] top-[310px] left-[909px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Inter-Bold',Helvetica] font-bold text-neutral-950 text-[24px] text-center tracking-[0] leading-[normal]">
          Doctors Notes
        </div>
        <div className="absolute w-[555px] h-[54px] top-[816px] left-[446px] rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040]">
          <div className="relative h-[57px] -top-px">
            <div className="w-[555px] h-[56px] top-px left-0 absolute bg-neutral-100 rounded-[20px]" />
            <div className="absolute w-[555px] h-[56px] top-0 left-0 [font-family:'Inter-Regular',Helvetica] font-normal text-neutral-950 text-[20px] text-center tracking-[0] leading-[normal]">
              Reset
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
