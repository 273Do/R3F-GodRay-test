import { Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import GRMain from "./components/GR/GRMain";

function App() {
  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
      <BrowserRouter>
        <div className="header">
          <span>
            <Link to="/" style={{ margin: "0 10px" }}>
              HOME
            </Link>
          </span>
          <span>
            <Link to="/scene1" style={{ margin: "0 10px" }}>
              HELLO
            </Link>
          </span>
          <span>
            <Link to="/scene2" style={{ margin: "0 10px" }}>
              ABOUT
            </Link>
          </span>
          <span>
            <Link to="/scene3" style={{ margin: "0 10px" }}>
              BLOG
            </Link>
          </span>
          <span>
            <Link to="/scene4" style={{ margin: "0 10px" }}>
              SHOP
            </Link>
          </span>
        </div>
        {/* <Three className="scene" /> */}
        <GRMain className="scene" />
      </BrowserRouter>
    </div>
  );
}

export default App;
