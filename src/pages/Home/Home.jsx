import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, post } from "../../utils/httpClient";
import { useNavigate } from "react-router-dom";
import TopBar from "../../elements/TopBar/TopBar.jsx";
export default function Home() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  const loadGames = async () => {
    const data = await get("/games");
    setGames(data);
  };

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (!(userAuth && userAuth.user_id)) {
      navigate("/login");
    }
    if (userAuth.role == "admin") {
      navigate("/admin");
    }
  });

  useEffect(() => {
    loadGames();
  }, []);
  //   const [tweets, setTweets] = useState([]);

  //   const loadTweets = async () => {
  //     const data = await get("/tweets");
  //     setTweets(data);
  //   };

  //   useEffect(() => {
  //     loadTweets();
  //   }, []);

  return (
    <div className="home-wrapper">
      <TopBar />
      {/* <div className="buttons-wrapper">
        <Link to="/tweets">
          <div className="main-button">Send Tweet</div>
        </Link>
        <Link to="/users">
          <div className="main-button">Users Page</div>
        </Link>
      </div>
      <div className="tweets-wrapper">
        <h2> Current Tweets </h2>
        {tweets.map((t) => (
          <div key={t.id} className="tweet">
            {" "}
            {t.text} {t.createdBy}{" "}
          </div>
        ))}
      </div> */}
      Home
      <div className="games-wrapper">
        <h2>Current Games</h2>
        {JSON.stringify(games)}
      </div>
    </div>
  );
}
