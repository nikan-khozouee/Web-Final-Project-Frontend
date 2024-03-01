import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, post } from "../../utils/httpClient";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (!(userAuth && userAuth.user_id) || userAuth.role != "admin") {
      navigate("/login");
    }
  });

  return <div className="home-wrapper">Admin Panel</div>;
}
