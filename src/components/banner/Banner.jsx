import React, { useState, useEffect } from "react";
import axios from "axios";

const baseImageUrl = process.env.REACT_APP_BASE_IMG_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const Banner = () => {
  const [movie, setMovie] = useState();
  const [showModal, setShowModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    async function fetchTrending() {
      try {
        const response = await axios.get(
          `${baseUrl}/trending/all/week?api_key=${apiKey}&language=en-US`
        );
        const results = response.data.results;
        console.log(results);
        setMovie(results[Math.floor(Math.random() * results.length)]);
      } catch (error) {
        console.error("Failed to fetch banner movie:", error);
      }
    }
    fetchTrending();
  }, []);

  const handleMoreInfo = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/${movie.media_type || "movie"}/${
          movie.id
        }/videos?api_key=${apiKey}`
      );
      const trailer = res.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailerKey(trailer ? trailer.key : "");
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
    setShowModal(true);
  };

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
                <button
                  onClick={handleMoreInfo}
                  className="outline-none border-none rounded-[5px] bg-[rgba(51,51,51,0.5)] px-6 py-2 text-white hover:bg-[#e6e6e6] hover:text-black"
                >
                  More Info
                </button>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
              <div className="bg-[#111] text-white p-6 rounded max-w-2xl w-full relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-4 text-white text-xl"
                >
                  x
                </button>
                <h2 className="text-3xl font-bold mb-2">
                  {movie.title || movie.name}
                </h2>
                <p className="text-sm mb-4">{movie.overview}</p>
                <p className="text-sm mb-2">
                  <strong>Release Date:</strong> {movie.release_date || "N/A"}
                </p>
                <p className="text-sm mb-4">
                  <strong>Rating:</strong> {movie.vote_average}
                </p>
                {trailerKey ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p className="text-gray-400">Trailer not available</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Banner;
