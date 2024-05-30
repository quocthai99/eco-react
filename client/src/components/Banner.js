import React, { useState } from "react";
import { RxDotFilled } from "react-icons/rx";

import { icons } from "../ultils/icons";

const { MdNavigateBefore, MdNavigateNext } = icons;

const sliders = [
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTniBk-ohAuiTP-85iDOhCm0Fi0zAigPZvAgw&s",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHdyHkK5_xFCVYi4Q-OIUKGY6CW-f_uhXbCg&s",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUXzWV1slKjuEVibfRheN8oaZPKnx_ltuwKg&s",
  },
];
const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sliders.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === sliders.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className="pl-5 w-3/4 h-[500px] overflow-hidden relative group">
      <div
        style={{ backgroundImage: `url(${sliders[currentIndex].url})`}}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      >

      </div>
      <div
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-10 text-2xl rounded-full p-2 bg-main text-white cursor-pointer "
      >
        <MdNavigateBefore size={30} />
      </div>
      <div
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-main text-white cursor-pointer"
      >
        <MdNavigateNext size={30} />
      </div>
      <div className="flex justify-center absolute bottom-0 left-[50%] translate-x-[-50%] " >
        {sliders.map((_, i) => (
          <div key={i} onClick={() => goToSlide(i)} className="text-2xl cursor-pointer" >
            <RxDotFilled size={30} className={`${ i === currentIndex && 'text-main'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
