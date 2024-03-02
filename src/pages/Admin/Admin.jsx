import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, post } from "../../utils/httpClient";
import { useNavigate } from "react-router-dom";
import TopBar from "../../elements/TopBar/TopBar.jsx";

export default function Home() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (!(userAuth && userAuth.user_id) || userAuth.role != "admin") {
      navigate("/login");
    }
  });

  const panelWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    paddingTop: "60px",
  };

  return (
    <div style={panelWrapperStyle}>
      <TopBar />
      <div>Admin Panel</div>
    </div>
  );
}
