import React from "react";

const Banner = () => {
  return (
    <div className="relative h-[70vh] object-cover">
      <img
        src="/onepiece_banner.jpg"
        alt="Banner"
        className="w-full h-full object-cover"
      />
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"> */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-90">
        <div className="absolute top-[30%] left-8 md:left-16 space-y-4 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            One Piece
          </h1>
          <p className="text-sm md:text-base text-white w-[45rem] max-w-[360px]">
            This is a brief description of the movie. It gives a summary of what
            the movie is about.
          </p>
          <div className="space-x-3 font-bold">
            <button className="outline-none border-none rounded-[5px] bg-[rgba(51,51,51,0.5)] px-6 py-2 text-white hover:bg-[#e6e6e6] hover:text-black">
              Play
            </button>
            <button className="outline-none border-none rounded-[5px] bg-[rgba(51,51,51,0.5)] px-6 py-2 text-white hover:bg-[#e6e6e6] hover:text-black">
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
