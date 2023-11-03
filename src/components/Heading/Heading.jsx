import React from "react";
import { RiGalleryFill } from "react-icons/ri";

const Heading = () => {
  return (
    <div className="flex items-center gap-x-1 text-center text-[#9d9d9d] text-[1rem] md:text-[1.5rem]">
      <RiGalleryFill className="!text-[#9d9d9d]"/>
      <h3 className="text-[1rem] md:text-[1.5rem]">Gallery</h3>
    </div>
  );
};

export default Heading;
