import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const baseImageUrl = process.env.REACT_APP_BASE_IMG_URL;
const baseUrl = process.env.REACT_APP_BASE_URL

const RowPost = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${baseUrl}${fetchUrl}`);
      setMovies(response.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div className="flex overflow-x-scroll no-scrollbar space-x-3 p-2">
        {movies.length > 0 && movies.map((movie) => (
          <img
            key={movie.id}
            src={`${baseImageUrl}${movie.poster_path}`}
            alt={movie.name || movie.title}
            className="h-40 object-cover rounded hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        ))}
      </div>
    </div>
  );
};

export default RowPost;
