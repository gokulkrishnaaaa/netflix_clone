
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Banner from "./components/banner/Banner";
import RowPost from "./components/rowpost/RowPost";
import requests from "./request";

function App() {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <RowPost title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
      <RowPost title="Trending Now" fetchUrl={requests.fetchTrending} />
      <RowPost title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <RowPost title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <RowPost title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <RowPost title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <RowPost title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <RowPost title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
