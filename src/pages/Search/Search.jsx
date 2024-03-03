import React, { useState, useEffect } from "react";
import TopBar from "../../elements/TopBar/TopBar.jsx";
import { get } from "../../utils/httpClient";

const GamesPage = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [developer, setDeveloper] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      const data = await get("/genres");
      setGenres(data);
    };

    const loadDevelopers = async () => {
      const data = await get("/game_developers");
      setDevelopers(data);
    };

    loadGenres();
    loadDevelopers();
  }, []);

  const ratings = ["E", "E10+", "T", "M", "AO", "RP", "RP17+"];
  const fetchGames = async () => {
    // Create an instance of URLSearchParams.
    let queryParams = new URLSearchParams();

    // Conditionally append parameters if they are not empty.
    if (search) queryParams.append("search", search);
    if (genre) queryParams.append("genre", genre);
    if (developer) queryParams.append("developer", developer);
    if (rating) queryParams.append("rating", rating);
    if (sort) queryParams.append("sort", sort);
    // Assuming 'order' is required and should always be included as it defaults to 'asc'.
    queryParams.append("order", order);

    // Convert queryParams to string form
    const queryString = queryParams.toString();

    try {
      console.log(`/games?${queryString}`);
      const data = await get(`/games?${queryString}`);
      console.log(data);

      setGames(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

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
          <option key={genre.genre_id} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
      <select value={developer} onChange={(e) => setDeveloper(e.target.value)}>
        <option value="">Select Developer</option>
        {developers.map((developer) => (
          <option key={developer.developer_id} value={developer.developer_name}>
            {developer.developer_name}
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "80%",
            maxWidth: "1000px", // Adjust the maximum width as needed
            border: "1px solid #ddd",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Title
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Developer
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Release Date
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Genre
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Rating
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Views
              </th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {game.title}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {game.developer_name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {new Date(game.release_date).toLocaleDateString("en-CA")}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {game.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {game.age_rating}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {game.views}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GamesPage;
