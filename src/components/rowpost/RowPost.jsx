import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const baseImageUrl = process.env.REACT_APP_BASE_IMG_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

const RowPost = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

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
                className="h-64 w-auto object-cover rounded hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RowPost;
