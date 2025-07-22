import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const baseImageUrl = process.env.REACT_APP_BASE_IMG_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const RowPost = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${baseUrl}${fetchUrl}`);
        setMovies(response.data.results);
        // console.log("response", response.data.results)
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const handleMoreInfo = async (movie) => {
    setSelectedMovie(movie);
    try {
      const res = await axios.get(
        `${baseUrl}/${movie.media_type || "movie"}/${
          movie.id
        }/videos?api_key=${apiKey}`
      );
      const trailer = res.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailerKey(trailer?.key);
    } catch (error) {
      console.error("Trailer fetch failed", error);
    }
  };

  return (
    <div className="bg-black">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth p-2">
          {movies.length > 0 &&
            movies.map((movie) => (
              <img
                key={movie.id}
                src={`${baseImageUrl}${movie.poster_path}`}
                alt={movie.title}
                className="h-64 w-auto object-cover rounded hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                onClick={() => handleMoreInfo(movie)}
              />
            ))}
        </div>
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#141414] text-white p-6 rounded-lg w-full max-w-xl relative">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-2 right-2 text-2xl font-bold"
            >
              x
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {selectedMovie.title || selectedMovie.name}
            </h2>
            {trailerKey ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allowFullScreen
                className="w-full h-64 mb-4 rounded"
              />
            ) : (
              <p className="mb-4 text-sm text-gray-400">
                Trailer not available
              </p>
            )}
            <p className="mb-2">{selectedMovie.overview}</p>
            <p className="text-sm text-gray-400">
              Rating: {selectedMovie.vote_average} | Release Date:{" "}
              {selectedMovie.release_date || selectedMovie.first_air_date}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RowPost;
