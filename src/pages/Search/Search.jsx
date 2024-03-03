import React, { useState, useEffect } from "react";
import TopBar from "../../elements/TopBar/TopBar.jsx";
import { get, post } from "../../utils/httpClient";

const GamesPage = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState([]);
  const [developer, setDeveloper] = useState([]);
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [games, setGames] = useState([]);

  const genres = get("/genres");
  const developers = get("/game_developers");
  const ratings = ["E", "E10+", "T", "M", "AO", "RP", "RP17+"];

  const fetchGames = async () => {
    const queryParams = new URLSearchParams({
      search,
      genre,
      developer,
      rating,
      sort,
      order,
    }).toString();

    try {
      const response = await fetch(`/games?${queryParams}`);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [search, genre, developer, rating, sort, order]);

  return (
    <div>
      <TopBar />
      <h1>Games</h1>
      <input
        type="text"
        placeholder="Search games..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre.genre_id} value={genre.genre_id}>
            {genre.name}
          </option>
        ))}
      </select>
      <select value={developer} onChange={(e) => setDeveloper(e.target.value)}>
        <option value="">Select Developer</option>
        {developers.map((developer) => (
          <option key={developer.id} value={developer.id}>
            {developer.name}
          </option>
        ))}
      </select>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="">Select Rating</option>
        {ratings.map((rating) => (
          <option key={rating} value={rating}>
            {rating}
          </option>
        ))}
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort By</option>
        <option value="release_date">Release Date</option>
        <option value="views">Views</option>
        <option value="title">Title</option>
      </select>
      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button onClick={fetchGames}>Search</button>

      <div>
        {games.map((game) => (
          <div key={game.id}>
            <h3>{game.title}</h3>
            {/* Display more game details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
