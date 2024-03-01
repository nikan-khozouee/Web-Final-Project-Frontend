import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "../../utils/httpClient";

export default function Home() {
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
    </div>
  );
}
