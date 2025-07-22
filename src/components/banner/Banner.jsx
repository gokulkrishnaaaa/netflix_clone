import React, { useState, useEffect } from "react";
import axios from "axios";

const baseImageUrl = process.env.REACT_APP_BASE_IMG_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const Banner = () => {
  const [movie, setMovie] = useState();

  useEffect(() => {
    async function fetchTrending() {
      try {
        const response = await axios.get(
          `${baseUrl}/trending/all/week?api_key=${apiKey}&language=en-US`
        );
        const results = response.data.results;
        console.log(results)
        setMovie(results[Math.floor(Math.random() * results.length)]);
      } catch (error) {
        console.error("Failed to fetch banner movie:", error);
      }
    }
    fetchTrending();
  }, []);

  return (
    <div className="relative h-[70vh] object-cover">
      {movie && (
        <>
          <img
            src={`${baseImageUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-[70vh] object-center object-cover "
          />
          {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"> */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-90">
            <div className="absolute top-[30%] left-8 md:left-16 space-y-4 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {movie.title || movie.name}
              </h1>
              <p className="text-sm md:text-base text-white w-[45rem] max-w-[360px]">
                {movie.overview?.length > 150
                  ? movie.overview.slice(0, 150) + "..."
                  : movie.overview}
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
        </>
      )}
    </div>
  );
};

export default Banner;
