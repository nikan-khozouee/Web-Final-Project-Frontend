import { Link } from "react-router-dom";
import { post } from "../../utils/httpClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
    const response = await post("/login", { username, password });
    if (response.error) {
      console.log("wrong username and/or password.");
    } else {
      localStorage.setItem("userAuth", JSON.stringify(response.user));
      navigate("/");
    }
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#0056b3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Link to="/">Back</Link>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </div>
      <button style={buttonStyle} onClick={handleSend}>
        Login
      </button>
    </div>
  );
}
export default LoginForm;
